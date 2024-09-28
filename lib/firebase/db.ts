import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import firebaseApp from "./firebase-config";
import {
  BudgetRequest,
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
 * Deletes a transaction category from the Firestore database.
 *
 * @param categoryId - The ID of the transaction category to be deleted.
 * @returns A promise that resolves with the deleted category.
 */
export const deleteTransactionCategory = (categoryId: string) => {
  return deleteDoc(doc(db, CATEGORIES_COLLECTION, categoryId));
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

export const deleteTransaction = (transactionId: string) => {
  return deleteDoc(doc(db, USER_TRANSACTIONS_COLLECTION, transactionId));
};

export const deleteBudget = (budgetId: string) => {
  return deleteDoc(doc(db, USER_BUDGET_COLLECTION, budgetId));
};

/**
 * Adds a new budget to the Firestore database.
 *
 * @param payload - The budget data to be added.
 * @returns A promise that resolves with the newly added budget.
 */
export const addNewBudget = (payload: BudgetRequest) => {
  return addDoc(collection(db, USER_BUDGET_COLLECTION), {
    ...payload,
    createdAt: serverTimestamp(), // Set createdAt to the current server timestamp
  });
};

/**
 * Updates a budget in the Firestore database.
 *
 * @param budgetId - The ID of the budget to be updated.
 * @param payload - The updated budget data.
 * @returns A promise that resolves with the updated budget.
 */
export const updateBudget = (
  budgetId: string,
  payload: BudgetRequest
): Promise<void> => {
  const docRef = doc(db, USER_BUDGET_COLLECTION, budgetId);
  return updateDoc(docRef, { ...payload });
};
