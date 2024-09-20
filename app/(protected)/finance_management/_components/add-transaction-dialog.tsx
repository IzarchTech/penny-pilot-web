"use client";

import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/providers/auth.provider";
import { Button } from "@/components/ui/button";
import { Loader, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AddTransactionRequest } from "@/lib/types";
import { addTransactionFormSchema } from "@/lib/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import useTransactionCategory from "./hooks/use-transaction-category";
import { addTransaction } from "@/lib/firebase/db";

/**
 * The AddTransactionDialog component is a dialog that allows the user to add a new
 * transaction to their account. It is rendered as a button that says "Add New"
 * and when clicked, it opens a dialog that allows the user to enter the amount
 * and category of the transaction. The user can choose to debit or credit the
 * transaction. The dialog also displays an error message if there is an error.
 *
 * @returns A React component that renders a dialog for adding a new transaction.
 */
export default function AddTransactionDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { transactionCategories } = useTransactionCategory();

  const form = useForm<AddTransactionRequest>({
    /**
     * The resolver is used to validate the form data using the
     * addTransactionFormSchema. If the data is invalid, the error
     * will be displayed in the form.
     */
    resolver: zodResolver(addTransactionFormSchema),
    /**
     * The default values for the form are set to 0.0 for the amount
     * and the current user's ID for the user ID.
     */
    defaultValues: {
      amount: 0.0,
      userId: currentUser?.uid ?? "",
      category: {},
    },
  });

  /**
   * The handleDebit function is called when the user clicks the debit button.
   * It calls the addTransaction function with the amount set to the negative
   * of the amount entered by the user. If the transaction is successful, it
   * resets the form and closes the dialog. If there is an error, it displays
   * an error message.
   */
  const handleDebit = form.handleSubmit((payload) => {
    setIsSubmitting(true);
    try {
      addTransaction({
        ...payload,
        amount: -payload.amount,
      });
      form.reset();
      toast.success("Transaction added", {
        position: "top-right",
      });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add transaction", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  /**
   * The handleCredit function is called when the user clicks the credit button.
   * It calls the addTransaction function with the amount entered by the user.
   * If the transaction is successful, it resets the form and closes the dialog.
   * If there is an error, it displays an error message.
   */
  const handleCredit = form.handleSubmit((payload) => {
    setIsSubmitting(true);
    try {
      addTransaction(payload);
      form.reset();
      toast.success("Transaction added", {
        position: "top-right",
      });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add transaction", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="items-center gap-4"
          variant="outline"
          onClick={() => setIsOpen(true)}
        >
          <PlusCircle /> <span>Add New</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Add a new transaction to your account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" autoComplete="off">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      step={0.01}
                      min={0.01}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(v) => {
                        const category = transactionCategories.find(
                          (category) => category.id === v
                        );

                        if (category) {
                          field.onChange(category);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {transactionCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex items-center justify-center w-full"
                disabled={isSubmitting}
                onClick={handleCredit}
              >
                {isSubmitting ? <Loader className="animate-spin" /> : "Credit"}
              </Button>
              <Button
                type="submit"
                className="flex items-center justify-center w-full"
                variant="destructive"
                disabled={isSubmitting}
                onClick={handleDebit}
              >
                {isSubmitting ? <Loader className="animate-spin" /> : "Debit"}
              </Button>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
