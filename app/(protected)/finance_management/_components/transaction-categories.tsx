"use client";

import AddTransactionCategoryDialog from "./add-transaction-category-dialog";
import useTransactionCategory from "./hooks/use-transaction-category";
import DeleteTransactionCategoryDialog from "./delete-transaction-category-dialog";

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
          key={category.id}
          className="flex items-center gap-2 border rounded-md pl-4 group hover:border-destructive/90"
        >
          <span>
            {category.icon} {category.name}
          </span>
          <DeleteTransactionCategoryDialog
            id={category.id}
            name={`${category.name} ${category.icon}`}
          />
        </div>
      ))}

      {/* Allow the user to add a new transaction category */}
      <AddTransactionCategoryDialog />
    </div>
  );
}
