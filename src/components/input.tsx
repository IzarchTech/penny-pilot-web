import type { ChangeEvent, FocusEvent, ReactElement, ReactNode } from "react";
import Flex from "./flex";

import styles from "./input.module.css";

type InputProps = {
	type?: "text" | "email" | "password" | "number" | "tel" | "url";
	name?: string;
	id?: string;
	placeholder?: string;
	value?: string | number | readonly string[];
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	icon?: ReactElement;
	label?: string | ReactNode;
};

export default function Input({ label, ...props }: Readonly<InputProps>) {
	return (
		<Flex direction="column" className={styles.container}>
			{label && <label htmlFor={props.id}>{label}</label>}
			<input {...props} />
			{props.icon}
		</Flex>
	);
}
