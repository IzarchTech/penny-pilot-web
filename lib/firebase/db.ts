import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import firebaseApp from "./firebase-config";
import {
  AddNewBudgetRequest,
  AddTransactionCategoryRequest,
  AddTransactionRequest,
} from "../types";

/**
 * Collection name for the user's transaction categories.
 */
export const CATEGORIES_COLLECTION = "categories";

/**
 * Collection name for the user's transactions.
 */
export const USER_TRANSACTIONS_COLLECTION = "transactions";

/**
 * Collection name for the user's budgets.
 */
export const USER_BUDGET_COLLECTION = "budgets";

/**
 * The Firestore database instance.
 *
 * @remarks
 * This instance is initialized with the default Firebase app instance.
 *
 * @see {@link https://firebase.google.com/docs/reference/js/firestore_.md#getfirestore}
 */
export const db = getFirestore(firebaseApp);

/**
 * Adds a new transaction category to the Firestore database.
 *
 * @param payload - The transaction category data to be added.
 * @returns A promise that resolves with the newly added category.
 */
export const addTransactionCategory = (
  payload: AddTransactionCategoryRequest
) => {
  return addDoc(collection(db, CATEGORIES_COLLECTION), {
    ...payload,
    createdAt: serverTimestamp(),
  });
};

/**
 * Adds a new transaction to the Firestore database.
 *
 * @param payload - The transaction data to be added.
 * @returns A promise that resolves with the newly added transaction.
 */
export const addTransaction = (payload: AddTransactionRequest) => {
  return addDoc(collection(db, USER_TRANSACTIONS_COLLECTION), {
    ...payload,
    createdAt: serverTimestamp(), // Set createdAt to the current server timestamp
  });
};

/**
 * Adds a new budget to the Firestore database.
 *
 * @param payload - The budget data to be added.
 * @returns A promise that resolves with the newly added budget.
 */
export const addNewBudget = (payload: AddNewBudgetRequest) => {
  return addDoc(collection(db, USER_BUDGET_COLLECTION), {
    ...payload,
    createdAt: serverTimestamp(), // Set createdAt to the current server timestamp
  });
};
