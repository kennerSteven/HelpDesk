import { CategorySchemaType } from "@repo/schemas";
import { db } from "../Config/firebase";

const COLLECTION_NAME = "categories";

async function NewCategory(data: CategorySchemaType) {
  const newDocRef = await db.collection(COLLECTION_NAME).add({
    nameCategory: data.nameCategory,
    descriptionCategory: data.descriptionCategory || "",
    createdAt: new Date().toISOString(),
  });

  const snapshot = await newDocRef.get();
  return {
    _id: newDocRef.id,
    id: newDocRef.id,
    ...snapshot.data(),
  };
}

async function GetCategory() {
  const snapshot = await db.collection(COLLECTION_NAME).get();
  const categories = snapshot.docs.map((doc) => ({
    _id: doc.id,
    id: doc.id,
    ...doc.data(),
  }));
  return categories;
}

async function GetCategoryById(id: string) {
  const doc = await db.collection(COLLECTION_NAME).doc(id).get();
  if (!doc.exists) {
    return null;
  }
  return {
    _id: doc.id,
    id: doc.id,
    ...doc.data(),
  };
}

export { GetCategory, NewCategory, GetCategoryById };
