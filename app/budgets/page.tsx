"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function BudgetsPage() {
  return (
    <div className="w-full flex flex-col gap-4 pt-4">
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        <Card className="h-40">
          <CardHeader>
            <CardDescription>SHOULDA Care Loan</CardDescription>
          </CardHeader>
          <CardContent>
            <h3>{formatCurrency(1_000_000)}</h3>
            <Progress className="h-2 mt-3" value={15} />
            <p className="text-xs mt-1 italic">{formatCurrency(150_000)}</p>
          </CardContent>
        </Card>

        <Button variant="outline" className="h-40 w-full flex-col gap-2 group">
          <Plus className="size-10 transition-all group-hover:scale-125 duration-500 delay-200 ease-in-out" />
          <p className="italic group-hover:font-semibold transition-all ease-in-out duration-200 group-hover:tracking-widest group-hover:uppercase">
            Add Budget
          </p>
        </Button>
      </div>
    </div>
  );
}
