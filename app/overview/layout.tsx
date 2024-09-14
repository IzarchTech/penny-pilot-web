import { Metadata } from "next";
import { ReactNode } from "react";
import AuthWrapper from "../_components/auth-wrapper";

export const metadata: Metadata = {
  title: "Overview - Penny Pilot",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <AuthWrapper pageTitle="Overview">{children}</AuthWrapper>;
}
