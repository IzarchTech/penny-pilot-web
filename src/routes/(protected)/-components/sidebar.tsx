import { Link } from "@tanstack/react-router";
import { LayoutDashboardIcon } from "lucide-react";
import Flex from "#/components/flex";
import styles from "./sidebar.module.css";

export default function Sidebar() {
	return (
		<Flex as="nav" direction="column" className={styles.sidebar}>
			<SidebarItem />
		</Flex>
	);
}

function SidebarItem() {
	return (
		<Link to="/overview" className={styles.sidebarItem}>
			<LayoutDashboardIcon />
			<span>Overview</span>
		</Link>
	);
}
