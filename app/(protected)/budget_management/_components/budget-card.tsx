import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Budget } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useBudget } from "./budget.provider";

type BudgetCardProps = {
  budget: Budget;
  percentage: number;
};

export default function BudgetCard({
  budget,
  percentage,
}: Readonly<BudgetCardProps>) {
  const { setBudgetToDelete, setBudgetToEdit } = useBudget();

  return (
    <Card className="min-h-40">
      <CardHeader className="flex-row justify-between items-center">
        <CardDescription>{budget.name}</CardDescription>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="link">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 z-[4] bg-background border p-2">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="gap-4"
                onClick={() => {
                  setBudgetToEdit(budget);
                }}
              >
                <Pencil />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-4 text-red-500 focus:bg-red-500"
                onClick={() => setBudgetToDelete(budget)}
              >
                <Trash2 />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <h3>{formatCurrency(budget.amount)}</h3>
        <Progress className="h-2 mt-3" value={percentage} />
        <p className="text-xs mt-1 italic">{formatCurrency(percentage)}</p>
      </CardContent>
    </Card>
  );
}
