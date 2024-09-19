import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finance Management - Penny Pilot",
};

/**
 * A wrapper component for the protected finance management pages.
 *
 * This component is used to wrap all the pages under the "finance management"
 * section. It provides a common layout for all those pages.
 *
 * @param {{ children: React.ReactNode }} props The props object.
 * @param {React.ReactNode} props.children The children of the component.
 */
export default function FinanceManagementLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="container">{children}</div>;
}
