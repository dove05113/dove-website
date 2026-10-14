import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "./firebase-firestore";

const businessDocument = doc(db, "business", "general");

export interface BusinessInformation {
  name: string;
  tagline: string;
  description: string;

  phone: string;
  email: string;
  whatsapp: string;

  address: string;
  location: string;

  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };

  logoUrl: string;
  faviconUrl: string;

  googleMapsUrl: string;
  latitude: number;
  longitude: number;

  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  whatsappUrl: string;
}

export async function getBusinessInformation(): Promise<
  (BusinessInformation & { id: string }) | null
> {
  const snapshot = await getDoc(businessDocument);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as BusinessInformation),
  };
}

export async function updateBusinessInformation(data: BusinessInformation) {
  await setDoc(
    businessDocument,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    },
  );
}
