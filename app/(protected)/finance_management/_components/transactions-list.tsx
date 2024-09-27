"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddTransactionDialog from "./add-transaction-dialog";
import useTransaction from "./hooks/use-transaction";
import { cn, formatCurrency, formatTime } from "@/lib/utils";
import DeleteTransactionDialog from "./delete-transaction-dialog";

export default function TransactionsList() {
  const { transactions } = useTransaction();
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex">
        <div className="flex-1"></div>
        <AddTransactionDialog />
      </div>

      {transactions.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell
                  className={cn(transaction.amount < 0 && "text-red-500")}
                >
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell>
                  {transaction.category.icon} {transaction.category.name}
                </TableCell>
                <TableCell>{formatTime(transaction.createdAt)}</TableCell>
                <TableCell>
                  <DeleteTransactionDialog id={transaction.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
