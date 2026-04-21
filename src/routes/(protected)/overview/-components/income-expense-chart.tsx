import Flex from "#/components/flex";

import styles from "./income-expense-chart.module.css";

export default function IncomeExpenseChart() {
	return (
		<Flex direction="column" className={styles.chartContainer}>
			<Flex direction="column" className={styles.chartHeader}>
				<h2>Flow Observatory</h2>
				<p>Income vs Expenses Analysis</p>
			</Flex>

			<div className={styles.chartWrapper}>Chart</div>
		</Flex>
	);
}
