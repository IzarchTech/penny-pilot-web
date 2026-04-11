import { Link } from "@tanstack/react-router";
import { InfoIcon, LayoutDashboardIcon, LogOutIcon, ScrollTextIcon, SettingsIcon } from "lucide-react";
import Flex from "#/components/flex";
import styles from "./sidebar.module.css";

export default function Sidebar() {
	return (
		<Flex as="nav" direction="column" className={styles.sidebar}>
			<Flex direction="column" className={styles.mainNav}>
				<SidebarItem to="/overview" label="Overview" icon={<LayoutDashboardIcon />} />
				<SidebarItem to="/transactions" label="Transactions" icon={<ScrollTextIcon />} />
				<SidebarItem to="/settings" label="Settings" icon={<SettingsIcon />} />
			</Flex>
			<Flex direction="column">
				<SidebarItem to="/support" label="Support" icon={<InfoIcon />} />
				<button type="button" className={styles.logoutButton}>
					<LogOutIcon />
					<span>Logout</span>
				</button>
			</Flex>
		</Flex>
	);
}

type SidebarItemProps = {
	to: string;
	label: string;
	icon: React.ReactNode;
};

function SidebarItem({ to, label, icon }: Readonly<SidebarItemProps>) {
	return (
		<Link
			to={to}
			className={styles.sidebarItem}
			activeProps={{
				className: styles.active,
			}}
		>
			{icon}
			<span>{label}</span>
		</Link>
	);
}
