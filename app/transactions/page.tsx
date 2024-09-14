"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency, formatTime } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { CalendarIcon, Trash } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

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
      title: "Contract",
      icon: "🤝🏾",
    },
  },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(PLACEHOLDER_TRANSACTIONS);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 5, 23),
    to: addDays(new Date(2024, 5, 23), 25),
  });

  const handleRemoveTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <>
      <div className="w-full p-4 flex">
        <div className="flex-1" />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Card className="w-full">
        <CardContent>
          {transactions.length === 0 && (
            <div className="min-h-40 flex items-center justify-center">
              <p className="italic text-center">Nothing to see here</p>
            </div>
          )}

          {transactions.length > 0 && (
            <Table className="w-full">
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
                    <TableCell className="text-2xl">
                      {t.category.icon}
                    </TableCell>
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
    </>
  );
}
