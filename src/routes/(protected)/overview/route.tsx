import { createFileRoute } from "@tanstack/react-router";
import Flex from "#/components/flex";
import { formatCurrency } from "#/lib/utils";
import StatCard from "./-components/stat-card";
import styles from "./overview.module.css";

export const Route = createFileRoute("/(protected)/overview")({
	component: OverviewRouteComponent,
});

function OverviewRouteComponent() {
	return (
		<Flex direction="column">
			<div className={styles.stats}>
				<StatCard title="Total Worth" value={formatCurrency(142850)} description="+2.4% this month" />
				<StatCard title="What you keep" value={formatCurrency(8420)} description="After projected taxes and essential costs" status="neutral" />
				<StatCard title="What's Owed" value={formatCurrency(3120)} description="Pending expenses up 12%" status="negative" />
			</div>
		</Flex>
	);
}
