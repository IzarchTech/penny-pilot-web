import { Metadata } from "next";
import { ReactNode } from "react";
import AuthWrapper from "../_components/auth-wrapper";

export const metadata: Metadata = {
  title: "Transaction History - Penny Pilot",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <AuthWrapper pageTitle="Transaction History">{children}</AuthWrapper>;
}
