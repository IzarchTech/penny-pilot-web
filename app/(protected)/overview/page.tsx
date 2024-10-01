"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth.provider";
import { PiggyBank, ReceiptText } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./_components/logout-button";

export default function OverviewPage() {
  const { currentUser } = useAuth();
  return (
    <div className="h-full container flex flex-col justify-center items-center">
      <Card className="max-w-[300px] md:max-w-md">
        <CardHeader>
          <CardTitle>Welcome Back, {currentUser?.displayName}</CardTitle>
          <CardDescription>
            Manage your budget, finance, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center flex-col">
          <div className="space-y-4">
            <Link
              href="/finance_management"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full gap-4 duration-500 ease-linear"
              )}
            >
              <ReceiptText />
              <span>Finance Management</span>
            </Link>
            <Link
              href="/budget_management"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full gap-4 duration-500 ease-linear"
              )}
            >
              <PiggyBank />
              <span>Budget Management</span>
            </Link>
            <LogoutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
