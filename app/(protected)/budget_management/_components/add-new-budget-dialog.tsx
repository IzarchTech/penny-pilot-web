import { useState } from "react";
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
import { useAuth } from "@/providers/auth.provider";
import { AddNewBudgetRequest } from "@/lib/types";
import { addNewBudgetFormSchema } from "@/lib/schemas";
import { toast } from "sonner";
import { addNewBudget } from "@/lib/firebase/db";

export default function AddNewBudgetDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddNewBudgetRequest>({
    resolver: zodResolver(addNewBudgetFormSchema),
    defaultValues: {
      name: "",
      amount: 0.0,
      userId: currentUser?.uid ?? "",
    },
  });

  const handleSubmit = form.handleSubmit(async (payload) => {
    setIsSubmitting(true);
    try {
      await addNewBudget(payload);
      toast.success("Budget added", {
        position: "top-right",
      });
      form.reset();
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to add budget", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-40 w-full flex-col gap-2 group">
          <Plus className="size-10 transition-all group-hover:scale-125 duration-500 delay-200 ease-in-out" />
          <p className="italic group-hover:font-semibold transition-all ease-in-out duration-200 group-hover:tracking-widest group-hover:uppercase">
            Add Budget
          </p>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Budget</DialogTitle>
          <DialogDescription>
            Add a new budget to your account.
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
                {isSubmitting ? <Loader className="animate-spin" /> : "Add"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setIsOpen(false)}
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
