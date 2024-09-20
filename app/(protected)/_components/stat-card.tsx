import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { ReactNode } from "react";

type StatCardProps = {
  children?: ReactNode;
  isCurrency?: boolean;
  stat: number;
  title: string;
};

export default function StatCard({
  children,
  isCurrency,
  stat,
  title,
}: Readonly<StatCardProps>) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-base font-light tracking-widest uppercase">
            {title}
          </p>
          {children}
        </div>

        <h2 className="mt-6">{isCurrency ? formatCurrency(stat) : stat}</h2>
      </CardContent>
    </Card>
  );
}
