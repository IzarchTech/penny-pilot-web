import { z } from "zod";
import {
  addTransactionCategoryFormSchema,
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
