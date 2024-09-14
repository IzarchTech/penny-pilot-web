"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { HandCoins, ReceiptText, Wallet } from "lucide-react";
import TransactionsCard from "./_components/transactions-card";

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col gap-4 pt-4">
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="w-full flex items-center justify-between">
              <p className="text-base font-thin tracking-widest uppercase">
                Balance
              </p>
              <Wallet className="size-9 text-muted" />
            </div>

            <h2 className="mt-6">{formatCurrency(20_000)}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="w-full flex items-center justify-between">
              <p className="text-base font-thin tracking-widest uppercase">
                Income
              </p>
              <HandCoins className="size-9 text-muted" />
            </div>

            <h2 className="mt-6">{formatCurrency(50_000)}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="w-full flex items-center justify-between">
              <p className="text-base font-thin tracking-widest uppercase">
                Expense
              </p>
              <ReceiptText className="size-9 text-muted" />
            </div>

            <h2 className="mt-6">{formatCurrency(30_000)}</h2>
          </CardContent>
        </Card>
      </div>

      <TransactionsCard />
    </div>
  );
}
