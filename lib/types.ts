import { z } from "zod";
import { loginUserFormSchema, registerUserFormSchema } from "./schemas";

export type UserRegisterRequest = Omit<
  z.infer<typeof registerUserFormSchema>,
  "passwordConfirmation"
>;

export type UserLoginRequest = z.infer<typeof loginUserFormSchema>;
