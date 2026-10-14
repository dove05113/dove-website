import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase-firestore";
import type { PricingOption } from "@/types/services";

const servicesCollection = collection(db, "services");

export interface CreateServiceData {
  name: string;
  slug: string;
  description: string;

  group: "cyber" | "design";
  category: string;

  imageUrl: string;

  featured: boolean;
  active: boolean;
  sortOrder: number;

  pricing: PricingOption[];
  pricingType: "fixed" | "custom";
}

export type UpdateServiceData = Partial<CreateServiceData>;

/*
  CREATE
*/
export async function createService(data: CreateServiceData) {
  const docRef = await addDoc(servicesCollection, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/*
  READ ALL
*/
export async function getServices() {
  const q = query(servicesCollection, orderBy("sortOrder", "asc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

/*
  READ ONE
*/
export async function getServiceById(id: string) {
  const documentRef = doc(db, "services", id);

  const snapshot = await getDoc(documentRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

/*
  UPDATE
*/
export async function updateService(id: string, data: UpdateServiceData) {
  const documentRef = doc(db, "services", id);

  await updateDoc(documentRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/*
  DELETE
*/
export async function deleteService(id: string) {
  const documentRef = doc(db, "services", id);

  await deleteDoc(documentRef);
}
