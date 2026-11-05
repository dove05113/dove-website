import { auth } from "@/lib/firebase-auth";

export interface CatalogueUploadResult {
  success: boolean;
  imageUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

export async function uploadCatalogueImage(
  file: File,
  category: string,
): Promise<CatalogueUploadResult> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to upload images.");
  }

  const token = await user.getIdToken();

  const formData = new FormData();

  formData.append("file", file);
  formData.append("category", category);

  const response = await fetch("/api/catalogue/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Image upload failed.");
  }

  return result;
}
