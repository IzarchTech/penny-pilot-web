import { z } from "zod";
import {
  addNewBudgetFormSchema,
  addTransactionCategoryFormSchema,
  addTransactionFormSchema,
  loginUserFormSchema,
  registerUserFormSchema,
} from "./schemas";

/**
 * The request body for registering a new user.
 *
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {string} name - The name of the user.
 */
export type UserRegisterRequest = z.infer<typeof registerUserFormSchema>;

/**
 * The request body for logging in an existing user.
 *
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 */
export type UserLoginRequest = z.infer<typeof loginUserFormSchema>;

/**
 * The request body for adding a new transaction category.
 *
 * @property {string} name - The name of the transaction category.
 * @property {string} icon - The icon for the transaction category.
 * @property {string} userId - The ID of the user.
 */
export type AddTransactionCategoryRequest = z.infer<
  typeof addTransactionCategoryFormSchema
>;

/**
 * A transaction category.
 *
 * @property {string} id - The ID of the transaction category.
 * @property {string} name - The name of the transaction category.
 * @property {string} icon - The icon for the transaction category.
 * @property {string} userId - The ID of the user who created the transaction category.
 * @property {Date} createdAt - The date the transaction category was created.
 */
export type TransactionCategory = {
  id: string;
  name: string;
  icon: string;
  userId: string;
  createdAt: Date;
};

/**
 * The request body for adding a new transaction.
 *
 * @property {number} amount - The amount of the transaction.
 * @property {Object} category - The transaction category.
 * @property {string} userId - The ID of the user who created the transaction.
 */
export type AddTransactionRequest = z.infer<typeof addTransactionFormSchema>;

/**
 * A Firebase Timestamp object.
 *
 * @see https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp
 */
export type FirebaseTimestamp = {
  /**
   * The number of seconds since the Unix epoch (January 1, 1970, 00:00:00 UTC).
   */
  seconds: number;
  /**
   * The number of nanoseconds since the seconds timestamp.
   */
  nanoseconds: number;
};

/**
 * A user transaction.
 *
 * @property {string} id - The ID of the transaction.
 * @property {number} amount - The amount of the transaction.
 * @property {Object} category - The transaction category.
 * @property {string} category.name - The name of the transaction category.
 * @property {string} category.icon - The icon for the transaction category.
 * @property {string} userId - The ID of the user who created the transaction.
 * @property {Date} createdAt - The date the transaction was created.
 */
export type UserTransaction = {
  id: string;
  amount: number;
  category: Pick<TransactionCategory, "name" | "icon">;
  userId: string;
  createdAt: FirebaseTimestamp;
};

/**
 * The request body for adding a new budget.
 *
 * @property {string} name - The name of the budget.
 * @property {number} amount - The amount of the budget.
 * @property {string} userId - The ID of the user who created the budget.
 */
export type AddNewBudgetRequest = z.infer<typeof addNewBudgetFormSchema>;
