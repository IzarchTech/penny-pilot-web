"use client";

import { useAuth } from "@/providers/auth.provider";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PageHeader from "../_components/page-header";
import AddNewBudgetDialog from "./_components/add-new-budget-dialog";
import { db, USER_BUDGET_COLLECTION } from "@/lib/firebase/db";
import { useEffect, useState } from "react";
import { Budget } from "@/lib/types";
import BudgetCard from "./_components/budget-card";
import EditBudgetDialog from "./_components/edit-budget-dialog";
import DeleteBudgetDialog from "./_components/delete-budget-dialog";

/**
 * The BudgetManagementPage component is a page that displays a list of the user's budgets.
 * Each budget is displayed as a card with the name, amount, and percentage of the budget.
 * The user can add a new budget by clicking the "Add new budget" button.
 * The user can edit a budget by clicking the "Edit" button on the budget card.
 * The user can delete a budget by clicking the "Delete" button on the budget card.
 */
export default function BudgetManagementPage() {
  const { currentUser } = useAuth();

  /**
   * The list of budgets retrieved from the Firestore database.
   */
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    /**
     * If the user is not logged in, return early.
     */
    if (!currentUser) return;

    /**
     * Retrieve the budgets from the Firestore database.
     */
    const q = query(
      collection(db, USER_BUDGET_COLLECTION),
      where("userId", "==", currentUser?.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      /**
       * Set the list of budgets to the array of budgets retrieved from the Firestore database.
       */
      setBudgets(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          amount: doc.data().amount,
          name: doc.data().name,
          userId: doc.data().userId,
          createdAt: doc.data().createdAt,
          entries: doc.data().entries,
        }))
      );
    });
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Budget Management"
        description="View and manage your budgets."
      />

      <div className="grid md:grid-cols-3 gap-6 lg:grid-cols-4">
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            percentage={
              /**
               * Calculate the percentage of the budget.
               * If the budget has no entries, the percentage is 0.
               */
              !budget.entries
                ? 0
                : budget.entries.reduce((acc, entry) => acc + entry.amount, 0)
            }
          />
        ))}
        {/* Add new budget button */}
        <AddNewBudgetDialog />
      </div>

      <EditBudgetDialog />
      <DeleteBudgetDialog />
    </div>
  );
}
