import { cn } from "@/utils/cn";
import React, { ComponentProps } from "react";

export type ContainerProps = ComponentProps<"div">;

export const Container: React.FC<ContainerProps> = ({
	className,
	...props
}) => {
	return <div className={cn("container mx-auto", className)} {...props} />;
};
