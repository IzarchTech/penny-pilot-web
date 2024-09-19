"use client";

import { useEffect, useState } from "react";
import { CATEGORIES_COLLECTION, db } from "@/lib/firebase/db";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "@/providers/auth.provider";
import { TransactionCategory } from "@/lib/types";

/**
 * This hook is used to fetch the transaction categories of the current user
 * and store them in the state.
 *
 * @returns The transaction categories of the current user.
 */
export default function useTransactionCategory(): {
  transactionCategories: TransactionCategory[];
} {
  const { currentUser } = useAuth();
  const [transactionCategories, setTransactionCategories] = useState<
    TransactionCategory[]
  >([]); // Initialize the state with an empty array

  useEffect(() => {
    // If the user is not logged in, return without doing anything
    if (!currentUser) return;

    // Define the query to fetch the transaction categories
    const q = query(
      collection(db, CATEGORIES_COLLECTION),
      where("userId", "==", currentUser.uid)
    );

    // Create the unsubscribe function to cleanup the listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Update the state with the current transaction categories
      setTransactionCategories(
        snapshot.docs.map((d) => ({
          // Extract the icon, name, id, userId and createdAt from the snapshot
          icon: d.data().icon,
          name: d.data().name,
          id: d.id,
          userId: d.data().userId,
          createdAt: d.data().createdAt,
        }))
      );
    });

    // Return the unsubscribe function to cleanup the listener when the component is unmounted
    return unsubscribe;
  }, [currentUser]);

  // Return the transaction categories
  return { transactionCategories };
}
