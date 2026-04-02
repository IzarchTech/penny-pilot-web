import type { ComponentProps } from "react";
import { cn } from "#/lib/utils";
import styles from "./button.module.css";

const BUTTON_VARIANTS = ["primary", "secondary", "outline"] as const;

type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

type ButtonProps = {
	variant?: ButtonVariant;
} & ComponentProps<"button">;

export default function Button({ variant = "primary", className, ...props }: Readonly<ButtonProps>) {
	return <button {...props} className={cn(styles[variant], className)} />;
}
