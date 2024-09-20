"use client";

import { useEffect, useMemo, useState } from "react";
import { USER_TRANSACTIONS_COLLECTION, db } from "@/lib/firebase/db";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "@/providers/auth.provider";
import { UserTransaction } from "@/lib/types";

/**
 * Hook to fetch the user's transactions from Firestore.
 *
 * @returns An object with three properties:
 *  - `incomeTotal`: The total income of the user.
 *  - `expenseTotal`: The total expense of the user.
 *  - `transactions`: An array of the user's transactions.
 */
export default function useTransaction() {
  const { currentUser } = useAuth();

  const [transactions, setTransactions] = useState<UserTransaction[]>([]);

  /**
   * Calculate the total income of the user.
   *
   * This is done by filtering the transactions array to only include
   * transactions with a positive amount, and then summing them up.
   */
  const incomeTotal = useMemo(() => {
    return transactions
      .filter((t) => t.amount > 0)
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  /**
   * Calculate the total expense of the user.
   *
   * This is done by filtering the transactions array to only include
   * transactions with a negative amount, and then summing them up.
   */
  const expenseTotal = useMemo(() => {
    return transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  useEffect(() => {
    if (!currentUser) return;
    // Create a query that fetches all transactions for the current user
    const q = query(
      collection(db, USER_TRANSACTIONS_COLLECTION),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );
    // Create an unsubscribe function to cleanup the listener when the component is unmounted
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Update the state with the current transactions
      setTransactions(
        snapshot.docs.map((d) => ({
          id: d.id,
          amount: d.data().amount,
          category: d.data().category,
          userId: d.data().userId,
          createdAt: d.data().createdAt,
        }))
      );
    });
    // Return the unsubscribe function to cleanup the listener when the component is unmounted
    return unsubscribe;
  }, [currentUser]);

  return {
    expenseTotal,
    incomeTotal,
    transactions,
  };
}
