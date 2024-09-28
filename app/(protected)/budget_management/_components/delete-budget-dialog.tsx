"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteBudget } from "@/lib/firebase/db";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useBudget } from "./budget.provider";

export default function DeleteBudgetDialog() {
  const { budgetToDelete, setBudgetToDelete } = useBudget();

  // Whether the user is currently deleting the budget
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle the event when the user clicks the delete button
  const handleDeleteBudget = async () => {
    setIsSubmitting(true);
    try {
      // Delete the transaction category from the Firestore database
      await deleteBudget(budgetToDelete!.id);

      // Display a success message
      toast.success("Budget deleted", {
        position: "top-right",
      });

      // Close the dialog
      setBudgetToDelete(null);
    } catch (error) {
      // Display an error message
      toast.error("Failed to delete budget", {
        position: "top-right",
      });
    } finally {
      // Stop submitting the form
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={!!budgetToDelete}
      onOpenChange={() => setBudgetToDelete(null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Delete Budget</DialogTitle>
        </DialogHeader>

        <p>
          Are you sure you want to delete{" "}
          <span className="font-bold">{`"${budgetToDelete?.name}"`}</span>?
        </p>

        <DialogFooter className="flex-row">
          <DialogClose asChild>
            <Button
              disabled={isSubmitting}
              variant="secondary"
              className="w-full"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isSubmitting}
            variant="destructive"
            className="w-full"
            onClick={handleDeleteBudget}
          >
            {isSubmitting ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
