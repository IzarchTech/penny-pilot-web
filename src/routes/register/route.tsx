import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon, AtSignIcon, LockIcon, LockKeyholeIcon, UserIcon } from "lucide-react";
import Button from "#/components/button";
import Card from "#/components/card";
import Flex from "#/components/flex";
import Input from "#/components/input";
import styles from "./register.module.css";

export const Route = createFileRoute("/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Flex as="main" className={styles.container} direction="column">
			<Card>
				<Card.Header>
					<Card.Title>Secure your future</Card.Title>
					<Card.Description className={styles.description}>Enter the observatory and watch your wealth grow with precision.</Card.Description>
				</Card.Header>

				<Card.Content>
					<Flex as="form" direction="column">
						<Input label="Full Name" type="text" name="fullName" id="name" placeholder="John Doe" icon={<UserIcon />} />
						<Input label="Email Address" type="email" name="email" id="email" placeholder="johndoe@example.com" icon={<AtSignIcon />} />
						<Input label="Password" type="password" name="password" id="password" placeholder="••••••••" icon={<LockKeyholeIcon />} />
						<Input label="Confirm Password" type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" icon={<LockIcon />} />
						<Button type="submit">
							<span>Create your observatory</span>
							<ArrowRightIcon />
						</Button>
					</Flex>
				</Card.Content>

				<Card.Footer className={styles.footerSection}>
					<p>Already monitoring your assets?</p>
					<Link to="/login">Login instead</Link>
				</Card.Footer>
			</Card>
		</Flex>
	);
}
