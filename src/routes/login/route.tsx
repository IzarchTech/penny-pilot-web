import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon, AtSignIcon, LockKeyholeIcon } from "lucide-react";
import Button from "#/components/button";
import Card from "#/components/card";
import Flex from "#/components/flex";
import Input from "#/components/input";
import styles from "./login.module.css";

export const Route = createFileRoute("/login")({
	head: () => ({
		meta: [
			{
				title: "Login - Penny Pilot",
			},
			{
				name: "twitter:title",
				content: "Login - Penny Pilot",
			},
			{
				name: "og:title",
				content: "Login - Penny Pilot",
			},
			{
				name: "description",
				content: "Access your financial observatory",
			},
			{
				name: "twitter:description",
				content: "Access your financial observatory",
			},
			{
				name: "og:description",
				content: "Access your financial observatory",
			},
		],
	}),
	component: LoginRouteComponent,
});

function LoginRouteComponent() {
	return (
		<Flex as="main" className={styles.container}>
			<Card>
				<Card.Header>
					<Card.Title>Welcome Back</Card.Title>
					<Card.Description>Access your financial observatory</Card.Description>
				</Card.Header>

				<Card.Content>
					<Flex as="form" direction="column" className={styles.form}>
						<Input label="Email Address" type="email" name="email" id="email" placeholder="johndoe@example.com" icon={<AtSignIcon />} />
						<Input
							label={
								<label htmlFor="password">
									<span>Password</span>
									<a href="/forgot-password">Forgot Password?</a>
								</label>
							}
							type="password"
							name="password"
							id="password"
							placeholder="••••••••"
							icon={<LockKeyholeIcon />}
						/>
						<Button type="submit">
							<span>Enter the observatory</span>
							<ArrowRightIcon className="icon" />
						</Button>
					</Flex>
				</Card.Content>

				<Card.Footer className={styles.footerSection}>
					<p>New to the pilot?</p>
					<Link to="/register">Create an account</Link>
				</Card.Footer>
			</Card>
		</Flex>
	);
}
