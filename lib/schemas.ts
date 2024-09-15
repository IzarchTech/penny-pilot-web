import { z } from "zod";

export const registerUserFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    passwordConfirmation: z.string().min(8, {
      message: "Password confirmation must be at least 8 characters",
    }),
  })
  .refine((ctx) => ctx.password === ctx.passwordConfirmation, {
    message: "Password confirmation must match password",
    path: ["passwordConfirmation"],
  });


export const loginUserFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});
