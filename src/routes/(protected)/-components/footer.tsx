import Flex from "#/components/flex";
import styles from "./footer.module.css";

export default function Footer() {
	return (
		<Flex as="footer" direction="column" className={styles.footer}>
			<p>Copyright © {new Date().getFullYear()} PennyPilot. All rights reserved.</p>
		</Flex>
	);
}
