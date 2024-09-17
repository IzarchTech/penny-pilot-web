"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserLoginRequest } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserFormSchema } from "@/lib/schemas";
import GoogleAuthButton from "./google-button";
import { userLogin } from "@/lib/firebase/auth";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AuthError } from "firebase/auth";

/**
 * Handles login form submission
 *
 */
export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UserLoginRequest>({
    resolver: zodResolver(loginUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Handles form submission
   *
   * The submission is handled by calling `userLogin` Firebase function
   * with the form data.
   * If the submission is successful, it will show a success toast.
   * If the submission fails, it will show an error toast with the error message.
   */
  const handleSubmit = form.handleSubmit(async (payload) => {
    setIsSubmitting(true);
    try {
      await userLogin(payload);

      form.reset(); // Reset the form

      toast.success("Login successful", {
        position: "top-right",
      }); // Show success toast
    } catch (error) {
      const authError = error as AuthError; // Cast the error to AuthError
      toast.error("Invalid credentials", {
        description: authError.code
          .split("/")[1]
          .replaceAll("-", " ")
          .trim()
          .replace(/(^|\s)\S/g, function (t) {
            return t.toUpperCase();
          }),
        position: "top-right",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false); // Reset the loading state
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Login</CardTitle>
        <CardDescription>
          Enter your details to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="flex items-center justify-center w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader className="animate-spin" /> : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <GoogleAuthButton />
      </CardFooter>
    </Card>
  );
}
