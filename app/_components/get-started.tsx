"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Oswald } from "next/font/google";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";
import { useAuth } from "@/providers/auth.provider";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const oswald = Oswald({ subsets: ["latin"] });

/**
 * The GetStarted component is used to display a button that links to the dashboard if the user is authenticated,
 * and a dialog with a tabs component for registering or logging in if the user is not authenticated.
 *
 * @returns The GetStarted component.
 */
export default function GetStarted() {
  const { currentUser } = useAuth();

  // If the user is authenticated, display a button that links to the dashboard.
  if (currentUser) {
    return (
      <Link
        className={cn(
          oswald.className,
          buttonVariants({ variant: "default" }),
          "h-20 md:h-24 rounded-none uppercase hover:scale-105 transition-all gap-1"
        )}
        href="/overview"
      >
        <span>Dashboard</span>
        <ArrowRight className="size-4" />
      </Link>
    );
  }

  // If the user is not authenticated, display a dialog with a tabs component for registering or logging in.
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            oswald.className,
            "h-20 md:h-24 rounded-none uppercase hover:scale-105 transition-all"
          )}
        >
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="sign-up">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="uppercase" value="sign-up">
              Register
            </TabsTrigger>
            <TabsTrigger className="uppercase" value="login">
              Login
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sign-up">
            <RegisterForm />
          </TabsContent>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
