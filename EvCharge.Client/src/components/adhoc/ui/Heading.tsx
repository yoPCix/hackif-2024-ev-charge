import { cn } from "@/utils/cn";
import React, { ComponentProps } from "react";

export type HeadingVariant =
	| "xx-large"
	| "x-large"
	| "large"
	| "medium"
	| "small"
	| "x-small"
	| "xx-small";

export type HeadingProps = ComponentProps<"h1"> & {
	variant?: HeadingVariant;
};

// prettier-ignore
export const headingClassNameMaper: Record<HeadingVariant, string> = {
	"xx-large": cn("text-[3.25rem] leading-[4rem]"),
	"x-large":  cn("text-[2.625rem] leading-[3.25rem]"),
	"large":    cn("text-[2rem] leading-[2.5rem]"),
	"medium":   cn("text-[1.75rem] leading-[2.25rem]"),
	"small":    cn("text-[1.5rem] leading-[2rem]"),
	"x-small":  cn("text-[1.125rem] leading-[1.75rem]"),
	"xx-small": cn("text-[1rem] leading-[1.625rem]"),
};

export const Heading: React.FC<HeadingProps> = ({
	variant = "medium",
	className,
	...props
}) => {
	return (
		<h1
			className={cn("", headingClassNameMaper[variant], className)}
			{...props}
		/>
	);
};
