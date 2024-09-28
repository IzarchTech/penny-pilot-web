import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Plus } from "lucide-react";
import { BudgetRequest } from "@/lib/types";
import { budgetFormSchema } from "@/lib/schemas";
import { toast } from "sonner";
import { updateBudget } from "@/lib/firebase/db";
import { useBudget } from "./budget.provider";

/**
 * The EditBudgetDialog component is a dialog that allows the user to edit a budget in their account.
 * It is rendered as a modal dialog that is opened when the user clicks the edit button on a budget
 * card. The dialog contains a form with input fields for the budget name and amount, and a button
 * to submit the form. When the form is submitted, the budget is updated in the Firestore database.
 * If there is an error, an error message is displayed. The dialog is closed when the user clicks
 * the cancel button or when the form is submitted successfully.
 */
export default function EditBudgetDialog() {
  const { budgetToEdit, setBudgetToEdit } = useBudget();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BudgetRequest>({
    resolver: zodResolver(budgetFormSchema),
  });

  const handleSubmit = form.handleSubmit(async (payload) => {
    setIsSubmitting(true);
    try {
      // Update the budget in the Firestore database
      await updateBudget(budgetToEdit!.id, payload);
      // Display a success message
      toast.success("Budget updated", {
        position: "top-right",
      });
      // Reset the form
      form.reset();
      // Close the dialog
      setBudgetToEdit(null);
    } catch (error) {
      // Display an error message
      toast.error("Failed to update budget", {
        position: "top-right",
      });
    } finally {
      // Stop submitting the form
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    if (!budgetToEdit) return;

    // Reset the form with the budget data
    form.reset(budgetToEdit);
  }, [budgetToEdit, form]);

  return (
    <Dialog open={!!budgetToEdit} onOpenChange={() => setBudgetToEdit(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Budget</DialogTitle>
          <DialogDescription>
            Update budget for {budgetToEdit?.name}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
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

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex items-center justify-center w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader className="animate-spin" /> : "Update"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setBudgetToEdit(null)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
