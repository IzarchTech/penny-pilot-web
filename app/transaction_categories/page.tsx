"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Plus, Trash } from "lucide-react";

export default function TransactionCategoriesPage() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="min-h-96 flex flex-col gap-4 items-center justify-center">
        <p className="italic text-center">Nothing to see here</p>
        <Button variant="outline">
          <Plus />
          <span>Add New Category</span>
        </Button>
      </div>

      <Card className="w-full">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-2" />
                <TableHead className="w-4">Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell className="text-2xl">🛜</TableCell>
                <TableCell>Internet/Data</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="icon">
                    <Pen />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
