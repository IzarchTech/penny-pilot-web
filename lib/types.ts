import { z } from "zod";
import { loginUserFormSchema, registerUserFormSchema } from "./schemas";

export type UserRegisterRequest = z.infer<typeof registerUserFormSchema>;

export type UserLoginRequest = z.infer<typeof loginUserFormSchema>;
