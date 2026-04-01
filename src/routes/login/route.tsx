import { createFileRoute } from "@tanstack/react-router";
import { ArrowRightIcon, LockKeyholeIcon, UserIcon } from "lucide-react";
import "@fontsource/inter/200.css";
import "@fontsource/inter/600.css";
import Button from "#/components/button";
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
		<main className={styles.container}>
			<div className={styles.formWrapper}>
				<h2>Welcome Back</h2>
				<p>Access your financial observatory</p>

				<form>
					<div className={styles.inputGroup}>
						<label htmlFor="email">Email Address</label>
						<input type="email" name="email" id="email" placeholder="johndoe@example.com" />
						<UserIcon />
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="password">
							<span>Password</span>
							<a href="/forgot-password">Forgot Password?</a>
						</label>
						<input type="password" name="password" id="password" />
						<LockKeyholeIcon />
					</div>
					<Button type="submit">
						<span>Enter the observatory</span>
						<ArrowRightIcon />
					</Button>
				</form>

				<div className={styles.footerSection}>
					<p>New to the pilot?</p>
					<a href="/signup">Create an account</a>
				</div>
			</div>
		</main>
	);
}
