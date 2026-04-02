import type { ComponentProps } from "react";
import { cn } from "#/lib/utils";
import styles from "./card.module.css";
import Flex from "./flex";

export default function Card({ className, ...props }: Readonly<ComponentProps<"div">>) {
	return <Flex direction="column" className={cn(styles.container, className)} {...props} />;
}

function CardHeader({ className, ...props }: Readonly<ComponentProps<"div">>) {
	return <Flex direction="column" className={cn(styles.header, className)} {...props} />;
}
CardHeader.displayName = "CardHeader";
Card.Header = CardHeader;

function CardTitle({ children, className, ...props }: Readonly<ComponentProps<"h2">>) {
	return (
		<h2 className={cn(styles.title, className)} {...props}>
			{children}
		</h2>
	);
}
CardTitle.displayName = "CardTitle";
Card.Title = CardTitle;

function CardDescription({ children, className, ...props }: Readonly<ComponentProps<"p">>) {
	return (
		<p className={cn(styles.description, className)} {...props}>
			{children}
		</p>
	);
}
CardDescription.displayName = "CardDescription";
Card.Description = CardDescription;

function CardContent({ className, ...props }: Readonly<ComponentProps<"div">>) {
	return <Flex direction="column" className={cn(styles.content, className)} {...props} />;
}
CardContent.displayName = "CardContent";
Card.Content = CardContent;

function CardFooter({ className, ...props }: Readonly<ComponentProps<"div">>) {
	return <Flex className={cn(styles.footer, className)} {...props} />;
}
CardFooter.displayName = "CardFooter";
Card.Footer = CardFooter;
