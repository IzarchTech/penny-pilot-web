import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import firebaseApp from "./firebase-config";
import { AddTransactionCategoryRequest } from "../types";

export const CATEGORIES_COLLECTION = "categories";

export const db = getFirestore(firebaseApp);

export const addTransactionCategory = (
  payload: AddTransactionCategoryRequest
) => {
  return setDoc(doc(db, CATEGORIES_COLLECTION, payload.name), {
    ...payload,
    createdAt: serverTimestamp(),
  });
};
