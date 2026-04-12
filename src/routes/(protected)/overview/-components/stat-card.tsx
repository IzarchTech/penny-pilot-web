import { TrendingUpIcon, TriangleAlertIcon } from "lucide-react";
import Flex from "#/components/flex";
import { cn } from "#/lib/utils";
import styles from "./stat-card.module.css";

type Status = "positive" | "negative" | "neutral";

type StatCardProps = {
	title: string;
	value: string | number;
	description: string;
	status?: Status;
};

export default function StatCard({ title, value, description, status = "positive" }: Readonly<StatCardProps>) {
	const statusClassnames = cn(
		styles.description,
		{
			[styles.negative]: status === "negative",
		},
		{
			[styles.positive]: status === "positive",
		},
		{
			[styles.neutral]: status === "neutral",
		},
	);

	return (
		<Flex
			direction="column"
			className={cn(styles.statCard, {
				[styles.positiveStat]: status === "positive",
			})}
		>
			<p className={styles.title}>{title}</p>
			<h3 className={styles.value}>{value}</h3>
			<p className={statusClassnames}>
				<StatusIcon status={status} /> {description}
			</p>
		</Flex>
	);
}

function StatusIcon({ status }: Readonly<{ status: Status }>) {
	switch (status) {
		case "positive":
			return <TrendingUpIcon className={styles.statusIcon} />;
		case "negative":
			return <TriangleAlertIcon className={styles.statusIcon} />;
		default:
			return null;
	}
}
