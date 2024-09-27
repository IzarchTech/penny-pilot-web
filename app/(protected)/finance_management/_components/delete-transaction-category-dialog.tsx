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
import { deleteTransactionCategory } from "@/lib/firebase/db";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type DeleteTransactionCategoryDialogProps = {
  id: string;
  name: string;
};

/**
 * The DeleteTransactionCategoryDialog component is a dialog that allows the
 * user to delete a transaction category from their account. It is rendered as
 * a button that says "Delete" and when clicked, it opens a dialog that asks the
 * user to confirm that they want to delete the transaction category. If the
 * user clicks "Delete", the transaction category is deleted from the Firestore
 * database. If there is an error, an error message is displayed.
 *
 * @param id - The ID of the transaction category to be deleted.
 * @param name - The name of the transaction category to be deleted.
 */
export default function DeleteTransactionCategoryDialog({
  id,
  name,
}: Readonly<DeleteTransactionCategoryDialogProps>) {
  // Whether the dialog is open
  const [isOpen, setIsOpen] = useState(false);

  // Whether the user is currently deleting the transaction category
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle the event when the user clicks the delete button
  const handleDeleteTransactionCategory = async () => {
    setIsSubmitting(true);
    try {
      // Delete the transaction category from the Firestore database
      await deleteTransactionCategory(id);

      // Display a success message
      toast.success("Transaction category deleted", {
        position: "top-right",
      });

      // Close the dialog
      setIsOpen(false);
    } catch (error) {
      // Display an error message
      toast.error("Failed to delete transaction category", {
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
          variant="outline"
          className="rounded-l-none hover:text-destructive-foreground hover:bg-destructive/90"
        >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle> Delete Transaction Category</DialogTitle>
        </DialogHeader>

        <p>
          Are you sure you want to delete{" "}
          <span className="font-bold">{`"${name}"`}</span>?
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
