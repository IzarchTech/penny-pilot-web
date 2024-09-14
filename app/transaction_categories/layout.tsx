import { Metadata } from "next";
import { ReactNode } from "react";
import AuthWrapper from "../_components/auth-wrapper";

export const metadata: Metadata = {
  title: "Transaction Categories - Penny Pilot",
};

export default function TransactionCategoriesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AuthWrapper pageTitle="Transaction Categories">{children}</AuthWrapper>
  );
}
