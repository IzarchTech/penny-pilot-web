import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";

type BudgetCardProps = {
  name: string;
  amount: number;
  percentage: number;
};

export default function BudgetCard({
  name,
  amount,
  percentage,
}: Readonly<BudgetCardProps>) {
  return (
    <Card className="h-40">
      <CardHeader>
        <CardDescription>SHOULDA Care Loan</CardDescription>
      </CardHeader>
      <CardContent>
        <h3>{formatCurrency(amount)}</h3>
        <Progress className="h-2 mt-3" value={percentage} />
        <p className="text-xs mt-1 italic">{formatCurrency(percentage)}</p>
      </CardContent>
    </Card>
  );
}
