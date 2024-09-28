import { Metadata } from "next";
import BudgetProvider from "./_components/budget.provider";

export const metadata: Metadata = {
  title: "Budget Management - Penny Pilot",
};

/**
 * A wrapper component for the protected budget management pages.
 *
 * This component is used to wrap all the pages under the "budget management"
 * section. It provides a common layout for all those pages.
 *
 * @param {{ children: React.ReactNode }} props The props object.
 * @param {React.ReactNode} props.children The children of the component.
 */
export default function BudgetManagementLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container">
      <BudgetProvider>{children}</BudgetProvider>
    </div>
  );
}
