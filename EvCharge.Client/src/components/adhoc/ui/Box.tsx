import { cn } from "@/utils/cn";
import React, { ComponentProps } from "react";

export type BoxProps = ComponentProps<"div"> & {
	variant?: BoxVariant;
};

export type BoxVariant =
	| "extra-light"
	| "light"
	| "normal"
	| "dark"
	| "extra-dark";

// prettier-ignore
export const boxClassNameMapper: Record<BoxVariant, string> = {
    "extra-dark":   cn("bg-beige-500"),
    "dark":         cn("bg-beige-400"),
    "normal":       cn("bg-beige-300"),
    "light":        cn("bg-beige-200"),
    "extra-light":  cn("bg-beige-100"),
}

export const Box: React.FC<BoxProps> = ({
	className,
	variant = "normal",
	...props
}) => {
	return (
		<div
			className={cn("text-brown-800", boxClassNameMapper[variant], className)}
			{...props}
		/>
	);
};
