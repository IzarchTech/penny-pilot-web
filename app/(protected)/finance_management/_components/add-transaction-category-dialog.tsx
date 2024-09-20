"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTransactionCategoryRequest } from "@/lib/types";
import { addTransactionCategoryFormSchema } from "@/lib/schemas";
import { useAuth } from "@/providers/auth.provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { addTransactionCategory } from "@/lib/firebase/db";
import { toast } from "sonner";

export default function AddTransactionCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPicker, setShowPicker] = useState(false);

  const form = useForm<AddTransactionCategoryRequest>({
    resolver: zodResolver(addTransactionCategoryFormSchema),
    defaultValues: {
      name: "",
      icon: "🟨",
      userId: currentUser?.uid ?? "",
    },
  });

  const handleSubmit = form.handleSubmit(async (payload) => {
    setIsSubmitting(true);
    try {
      await addTransactionCategory(payload);
      toast.success("Transaction category added", {
        position: "top-right",
      });
      form.reset();
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to add transaction category", {
        position: "top-right",
      });
    }
    setIsSubmitting(false);
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
          <DialogTitle>Add New Transaction Category</DialogTitle>
          <DialogDescription>
            Create a new transaction category to easily identify and group
            related transactions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
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
              name="icon"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-16 text-[32px]"
                        id="icon"
                        onClick={() => setShowPicker(!showPicker)}
                      >
                        {form.getValues("icon")}
                      </Button>
                      <EmojiPicker
                        open={showPicker}
                        onEmojiClick={(emoji) => {
                          field.onChange(emoji.emoji);
                          setShowPicker(false);
                        }}
                      />
                    </>
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
