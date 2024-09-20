"use client";

import { useAuth } from "@/providers/auth.provider";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PageHeader from "../_components/page-header";
import AddNewBudgetDialog from "./_components/add-new-budget-dialog";
import { db, USER_BUDGET_COLLECTION } from "@/lib/firebase/db";
import { useEffect, useState } from "react";
import { Budget } from "@/lib/types";
import BudgetCard from "./_components/budget-card";

export default function BudgetManagementPage() {
  const { currentUser } = useAuth();

  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, USER_BUDGET_COLLECTION),
      where("userId", "==", currentUser?.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
            {...budget}
            percentage={
              !budget.entries
                ? 0
                : budget.entries.reduce((acc, entry) => acc + entry.amount, 0)
            }
          />
        ))}
        {/* Add new budget button */}
        <AddNewBudgetDialog />
      </div>
    </div>
  );
}
