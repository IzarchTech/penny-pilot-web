"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  Calculator,
  CircleGauge,
  FilePieChart,
  GitMerge,
  LucideProps,
  MonitorSmartphone,
  TabletSmartphone,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type FeatureType = {
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const FEATURES: FeatureType[] = [
  {
    title: "Simple and Intuitive Interface",
    description:
      "Designed for users of all levels, our app makes tracking your finances straightforward and hassle-free.",
    icon: TabletSmartphone,
  },
  {
    title: "Comprehensive Dashboard",
    description:
      "Get a clear overview of your financial situation at a glance with our detailed dashboard.",
    icon: CircleGauge,
  },
  {
    title: "Expense Categorization",
    description:
      "Easily categorize your expenses to understand where your money is going.",
    icon: GitMerge,
  },
  {
    title: "Income Tracking",
    description: "Record and manage multiple income sources effortlessly.",
    icon: BarChart2,
  },
  {
    title: "Budgeting Tools",
    description:
      "Set monthly budgets and track your progress to ensure you stay within your limits.",
    icon: Calculator,
  },
  {
    title: "Reports and Insights",
    description:
      "Generate detailed reports to analyze your spending and income patterns.",
    icon: FilePieChart,
  },
  {
    title: "Multi-Device Sync",
    description:
      "Access your financial data from any device, anywhere, anytime.",
    icon: MonitorSmartphone,
  },
];

function FeatureCard({
  feature,
  className,
}: Readonly<{ feature: FeatureType; className?: string }>) {
  return (
    <Card className={className}>
      <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
        <div className="size-16 p-4 rounded-full flex items-center justify-center bg-secondary">
          <feature.icon className="size-12" />
        </div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </CardContent>
    </Card>
  );
}

function FeaturesSection() {
  return (
    <div className="w-full flex items-center bg-secondary py-12" id="features">
      <div className="container space-y-4">
        <h2 className="uppercase text-center">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, idx) => (
            <FeatureCard
              key={feature.title.toLocaleLowerCase().replaceAll(" ", "_")}
              feature={feature}
              className={cn(
                idx === FEATURES.length - 1 && "md:col-span-2 lg:col-span-3"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
