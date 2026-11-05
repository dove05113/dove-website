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

const catalogueCollection = collection(db, "catalogueItems");

export type CatalogueCategory =
  | "graphic-design"
  | "branding"
  | "marketing-materials"
  | "photography";

export interface CatalogueItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: CatalogueCategory;
  subcategory: string;

  imageUrl: string;
  imagePublicId?: string;

  galleryImages: string[];
  galleryImagePublicIds?: string[];

  featured: boolean;
  active: boolean;
  sortOrder: number;

  serviceId?: string;

  createdAt?: unknown;
  updatedAt?: unknown;
}

export type CreateCatalogueItemData = Omit<
  CatalogueItem,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateCatalogueItemData = Partial<CreateCatalogueItemData>;

/*
  CREATE
*/
export async function createCatalogueItem(data: CreateCatalogueItemData) {
  const docRef = await addDoc(catalogueCollection, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/*
  READ ALL
*/
export async function getCatalogueItems(): Promise<CatalogueItem[]> {
  const q = query(catalogueCollection, orderBy("sortOrder", "asc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  })) as CatalogueItem[];
}

/*
  READ ONE
*/
export async function getCatalogueItemById(
  id: string,
): Promise<CatalogueItem | null> {
  const documentRef = doc(db, "catalogueItems", id);
  const snapshot = await getDoc(documentRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as CatalogueItem;
}

/*
  UPDATE
*/
export async function updateCatalogueItem(
  id: string,
  data: UpdateCatalogueItemData,
) {
  const documentRef = doc(db, "catalogueItems", id);

  await updateDoc(documentRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/*
  DELETE
*/
export async function deleteCatalogueItem(id: string) {
  const documentRef = doc(db, "catalogueItems", id);

  await deleteDoc(documentRef);
}
