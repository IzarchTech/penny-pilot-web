"use client";

import PageHeader from "../_components/page-header";
import { ReceiptText, Split, Wallet } from "lucide-react";
import StatCard from "../_components/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionsList from "./_components/transactions-list";
import TransactionCategories from "./_components/transaction-categories";
import useTransactionCategory from "./_components/hooks/use-transaction-category";
import useTransaction from "./_components/hooks/use-transaction";

export default function FinanceManagement() {
  const { transactionCategories } = useTransactionCategory();
  const { incomeTotal, expenseTotal } = useTransaction();
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Finance Management"
        description="View and manage your transactions."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Income" stat={incomeTotal} isCurrency>
          <Wallet className="size-9 opacity-25" />
        </StatCard>
        <StatCard title="Expense" stat={expenseTotal} isCurrency>
          <ReceiptText className="size-9 opacity-25" />
        </StatCard>
        <StatCard
          title="Transaction Category"
          stat={transactionCategories.length}
        >
          <Split className="size-9 opacity-25" />
        </StatCard>
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList>
          <TabsTrigger className="uppercase" value="transactions">
            Transactions
          </TabsTrigger>
          <TabsTrigger className="uppercase" value="categories">
            Transaction Categories
          </TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <TransactionsList />
        </TabsContent>
        <TabsContent value="categories">
          <TransactionCategories />
        </TabsContent>
      </Tabs>
    </div>
  );
}
