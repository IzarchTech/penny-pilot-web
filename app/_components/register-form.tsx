"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserRegisterRequest } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserFormSchema } from "@/lib/schemas";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerUser } from "@/lib/firebase/auth";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth.provider";
import GoogleAuthButton from "./google-button";
import { toast } from "sonner";
import { AuthError } from "firebase/auth";

/**
 * Handles user registration.
 */
export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setCurrentUser } = useAuth();

  /**
   * The form state management
   */
  const form = useForm<UserRegisterRequest>({
    resolver: zodResolver(registerUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  /**
   * Handle form submission
   */
  const handleSubmit = form.handleSubmit(async (payload) => {
    setIsSubmitting(true);
    try {
      const response = await registerUser(payload);
      toast.success("Account created successfully, please login", {
        position: "top-right",
      });
      form.reset(); // Reset the form
      setCurrentUser(response.user); // Set the current user
    } catch (error) {
      const authError = error as AuthError; // Cast the error to AuthError
      toast.error("Account creation failed, please try again", {
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
        <CardTitle className="uppercase">Sign Up</CardTitle>
        <CardDescription>
          Enter your details to create an account.
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
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
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
              {isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                "Register Now"
              )}
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
