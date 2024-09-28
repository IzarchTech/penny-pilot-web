"use client";

import { Budget } from "@/lib/types";
import { createContext, useContext, useMemo, useState } from "react";

/**
 * The budget context.
 */
const BudgetContext = createContext<{
  budgetToDelete: Budget | null;
  budgetToEdit: Budget | null;
  setBudgetToDelete: (budget: Budget | null) => void;
  setBudgetToEdit: (budget: Budget | null) => void;
}>({
  budgetToDelete: null,
  budgetToEdit: null,
  setBudgetToDelete: () => {},
  setBudgetToEdit: () => {},
});

/**
 * The budget context provider.
 *
 * This component provides the budget context to its children.
 *
 * @remarks
 * This component uses the `useMemo` hook to memoize the context value.
 * This is necessary because the context value is an object that contains
 * functions, and we don't want to recreate the object on every render.
 *
 * @param {{ children: React.ReactNode }} props The props object.
 * @param {React.ReactNode} props.children The children of the component.
 */
export default function BudgetProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /**
   * The budget to delete.
   *
   * This state is used to track which budget the user wants to delete.
   * When the user clicks on the "Delete" button on a budget, this state is
   * updated with the budget that the user wants to delete.
   */
  const [budgetToDelete, setBudgetToDelete] = useState<Budget | null>(null);

  /**
   * The budget to edit.
   *
   * This state is used to track which budget the user wants to edit.
   * When the user clicks on the "Edit" button on a budget, this state is
   * updated with the budget that the user wants to edit.
   */
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | null>(null);

  /**
   * The memoized context value.
   *
   * This value is memoized using the `useMemo` hook so that it is not recreated
   * on every render.
   */
  const value = useMemo(
    () => ({
      budgetToDelete,
      budgetToEdit,
      setBudgetToDelete,
      setBudgetToEdit,
    }),
    [budgetToDelete, budgetToEdit, setBudgetToDelete, setBudgetToEdit]
  );

  return (
    /**
     * The context provider.
     *
     * This component provides the context to its children.
     */
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
}

export const useBudget = () => useContext(BudgetContext);
