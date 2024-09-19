"use client";

import AddTransactionCategoryDialog from "./add-transaction-category-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import useTransactionCategory from "./hooks/use-transaction-category";

/**
 * Transaction categories component.
 *
 * This component displays the list of transaction categories and allows the
 * user to add a new one.
 */
export default function TransactionCategories() {
  const { transactionCategories } = useTransactionCategory();

  return (
    <div className="w-full flex flex-wrap gap-4 pt-4 md:pt-6">
      {/* Display existing transaction categories */}
      {transactionCategories.map((category) => (
        <div
          className={cn(buttonVariants({ variant: "outline" }))}
          key={category.id}
        >
          {category.icon} {category.name}
        </div>
      ))}

      {/* Allow the user to add a new transaction category */}
      <AddTransactionCategoryDialog />
    </div>
  );
}
