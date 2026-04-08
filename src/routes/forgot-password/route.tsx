import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon, AtSignIcon, ShieldCheckIcon } from "lucide-react";
import Button from "#/components/button";
import Card from "#/components/card";
import Flex from "#/components/flex";
import Input from "#/components/input";
import styles from "./forgot-password.module.css";

export const Route = createFileRoute("/forgot-password")({
	head: () => ({
		meta: [
			{
				title: "Forgot Password - Penny Pilot",
			},
			{
				name: "twitter:title",
				content: "Forgot Password - Penny Pilot",
			},
			{
				name: "og:title",
				content: "Forgot Password - Penny Pilot",
			},
			{
				name: "description",
				content: "Enter your credentials to receive a secure recovery link for your observatory",
			},
			{
				name: "twitter:description",
				content: "Enter your credentials to receive a secure recovery link for your observatory",
			},
			{
				name: "og:description",
				content: "Enter your credentials to receive a secure recovery link for your observatory",
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Flex as="main" className={styles.container}>
			<Flex direction="column">
				<Card>
					<Card.Header>
						<Card.Title>Recover Access</Card.Title>
						<Card.Description className={styles.description}>Enter your credentials to receive a secure recovery link for your observatory</Card.Description>
					</Card.Header>

					<Card.Content>
						<Flex as="form" direction="column" className={styles.form}>
							<Input label="Email Address" type="email" name="email" id="email" placeholder="johndoe@example.com" icon={<AtSignIcon />} />
						</Flex>
						<Button type="submit">Send Recovery Link</Button>
					</Card.Content>

					<Card.Footer className={styles.footerSection}>
						<Link to="/login">
							<ArrowLeftIcon />
							<span>Back to Login</span>
						</Link>
					</Card.Footer>
				</Card>

				<Flex className={styles.cta}>
					<Flex className={styles.sheildIcon}>
						<ShieldCheckIcon />
					</Flex>
					<Flex direction="column">
						<h5>Technical Security</h5>
						<p>Recovery links are encrypted with SHA-256 and expire at exactly 15 minutes after generation to maintain observatory integrity.</p>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
