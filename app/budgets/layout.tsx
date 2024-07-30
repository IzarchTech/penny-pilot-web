import { Metadata } from "next";
import { ReactNode } from "react";
import AuthWrapper from "../_components/auth-wrapper";

export const metadata: Metadata = {
  title: "Budgets - Penny Pilot",
};

export default function BudgetsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <AuthWrapper pageTitle="Budgets">{children}</AuthWrapper>;
}
