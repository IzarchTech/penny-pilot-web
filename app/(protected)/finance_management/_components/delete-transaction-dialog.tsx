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
import { deleteTransaction } from "@/lib/firebase/db";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type DeleteTransactionDialogProps = {
  id: string;
};

/**
 * The DeleteTransactionDialog component is a dialog that allows the
 * user to delete a transaction from their account. It is rendered as
 * a button that says "Delete" and when clicked, it opens a dialog that asks the
 * user to confirm that they want to delete the transaction. If the
 * user clicks "Delete", the transaction is deleted from the Firestore
 * database. If there is an error, an error message is displayed.
 *
 * @param id - The ID of the transaction to be deleted.
 */
export default function DeleteTransactionDialog({
  id,
}: Readonly<DeleteTransactionDialogProps>) {
  // Whether the dialog is open
  const [isOpen, setIsOpen] = useState(false);

  // Whether the user is currently deleting the transaction
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle the event when the user clicks the delete button
  const handleDeleteTransactionCategory = async () => {
    setIsSubmitting(true);
    try {
      // Delete the transaction from the Firestore database
      await deleteTransaction(id);

      // Display a success message
      toast.success("Transaction deleted", {
        position: "top-right",
      });

      // Close the dialog
      setIsOpen(false);
    } catch (error) {
      // Display an error message
      toast.error("Failed to delete transaction", {
        position: "top-right",
      });
    } finally {
      // Stop submitting the form
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
        >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Transaction</DialogTitle>
        </DialogHeader>

        <p>
          Are you sure you want to delete this transaction?
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
            onClick={handleDeleteTransactionCategory}
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
