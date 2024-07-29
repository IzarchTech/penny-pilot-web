"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatTime } from "@/lib/utils";
import { Trash } from "lucide-react";
import { useState } from "react";

type CategoryType = {
  id: string;
  title: string;
  icon: string;
};

type TransactionType = {
  id: string;
  amount: number;
  title: string;
  createdAt: number;
  category: CategoryType;
};

const PLACEHOLDER_TRANSACTIONS: TransactionType[] = [
  {
    id: "tx-01",
    amount: -1000,
    title: "MTN Airtime",
    createdAt: Date.now(),
    category: {
      id: "category-01",
      title: "Airtime",
      icon: "📱",
    },
  },
  {
    id: "tx-02",
    amount: -10000,
    title: "Fuel",
    createdAt: Date.now(),
    category: {
      id: "category-02",
      title: "Car",
      icon: "🚗",
    },
  },
  {
    id: "tx-03",
    amount: -5000,
    title: "MTN Airtime",
    createdAt: Date.now(),
    category: {
      id: "category-03",
      title: "Data",
      icon: "🛜",
    },
  },
  {
    id: "tx-04",
    amount: 25000,
    title: "Website design",
    createdAt: Date.now(),
    category: {
      id: "category-03",
      title: "Data",
      icon: "🤝🏾",
    },
  },
];

export default function TransactionsCard() {
  const [transactions, setTransactions] = useState(PLACEHOLDER_TRANSACTIONS);

  const handleRemoveTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="uppercase">Transactions</CardTitle>
      </CardHeader>

      <CardContent>
        {transactions.length === 0 && (
          <div className="min-h-40 flex items-center justify-center">
            <p className="italic text-center">Nothing to see here</p>
          </div>
        )}

        {transactions.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <Table />
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="text-2xl">{t.category.icon}</TableCell>
                  <TableCell>{t.title}</TableCell>
                  <TableCell>{t.category.title}</TableCell>
                  <TableCell
                    className={`${t.amount < 0 ? "text-red-700" : "text-green-600"}`}
                  >
                    {formatCurrency(t.amount)}
                  </TableCell>
                  <TableCell>{formatTime(t.createdAt)}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveTransaction(t.id)}
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
