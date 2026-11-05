import { NextResponse } from "next/server";

import { adminAuth } from "@/lib/firebase-admin";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ALLOWED_CATEGORIES = [
  "graphic-design",
  "branding",
  "marketing-materials",
  "photography",
];

export async function POST(request: Request) {
  try {
    // 1. Verify Firebase authentication

    const authorization = request.headers.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const token = authorization.split("Bearer ")[1];

    await adminAuth.verifyIdToken(token);

    // 2. Read uploaded file

    const formData = await request.formData();

    const file = formData.get("file");
    const category = formData.get("category");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No image was provided." },
        { status: 400 },
      );
    }

    if (
      typeof category !== "string" ||
      !ALLOWED_CATEGORIES.includes(category)
    ) {
      return NextResponse.json(
        { error: "Invalid catalogue category." },
        { status: 400 },
      );
    }

    // 3. Validate image

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG and WebP images are allowed." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image must not exceed 10 MB." },
        { status: 400 },
      );
    }

    // 4. Convert file to buffer

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Upload to Cloudinary

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `dove-print-solutions/catalogue/${category}`,
            resource_type: "image",
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result) {
              resolve(result);
            } else {
              reject(new Error("Image upload failed."));
            }
          },
        )
        .end(buffer);
    });

    // 6. Return uploaded image information

    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error) {
    console.error("Catalogue image upload error:", error);

    return NextResponse.json(
      { error: "Unable to upload image." },
      { status: 500 },
    );
  }
}
