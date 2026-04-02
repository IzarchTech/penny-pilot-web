import type { ComponentProps, ElementType } from "react";
import { cn } from "#/lib/utils";
import styles from "./flex.module.css";
import type { SemanticElement } from "./types";

// Define allowed flex direction values
const FLEX_DIRECTION = ["row", "column"] as const;
type FlexDirection = (typeof FLEX_DIRECTION)[number];

// Base props for the Flex component
type Base = {
	direction?: FlexDirection;
};

// Generic props type that preserves the polymorphic component's native props
// and restricts the 'as' prop to semantic elements only
type FlexProps<C extends ElementType = "div"> = Base &
	Omit<ComponentProps<C>, keyof Base> & {
		as?: C extends SemanticElement ? C : never;
	};

/**
 * Flex component - A polymorphic flexbox wrapper
 * @param as - Semantic HTML element to render as (default: "div")
 * @param children - Child components
 * @param className - Additional CSS classes
 * @param direction - Flex direction: "row" or "column"
 * @param props - Additional props passed to the rendered element
 */
export default function Flex<C extends ElementType = "div">({ as, children, className, direction, ...props }: FlexProps<C>) {
	const Component = as ?? ("div" as const);

	return (
		<Component {...props} className={cn(className, direction && styles[direction], styles.container)}>
			{children}
		</Component>
	);
}
