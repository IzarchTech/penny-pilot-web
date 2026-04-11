import { createFileRoute, Outlet } from "@tanstack/react-router";
import Flex from "#/components/flex";
import Footer from "./-components/footer";
import Sidebar from "./-components/sidebar";

import styles from "./layout.module.css";

export const Route = createFileRoute("/(protected)")({
	component: ProtectedRouteLayoutComponent,
});

function ProtectedRouteLayoutComponent() {
	return (
		<div className={styles.container}>
			<Flex>
				<Sidebar />
				<Flex as="main" direction="column" className={styles.content}>
					<Outlet />
				</Flex>
			</Flex>
			<Footer />
		</div>
	);
}
