import type { ComponentProps } from "react";
import { cn } from "#/lib/utils";
import styles from "./button.module.css";

const Buttonvariants = ["primary", "secondary", "outline"] as const;

type ButtonVariant = (typeof Buttonvariants)[number];

type ButtonProps = {
	variant?: ButtonVariant;
} & ComponentProps<"button">;

export default function Button({ variant = "primary", ...props }: Readonly<ButtonProps>) {
	return <button {...props} className={cn(styles[variant])} />;
}
