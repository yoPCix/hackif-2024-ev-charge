import { cn } from "@/utils/cn";
import {
	Button,
	ButtonSize,
	ButtonType,
	ButtonVariant,
} from "@ids/react-button";
import { Product24CameraFlash } from "@ids/react-icons";
import { Tag, TagSize, TagVariant } from "@ids/react-tag";
import {
	TypographyHeading,
	TypographyHeadingSize,
	TypographyUI,
	TypographyUISize,
} from "@ids/react-typography";
import React from "react";

export type WaypointListItemProps = {
	title: string;
	subtitle: string;
	power: number;
	isVisited: boolean;
};

export const WaypointListItem: React.FC<WaypointListItemProps> = ({
	title,
	subtitle,
	isVisited,
	power,
	...props
}) => {
	return (
		<li className={cn("flex border-b-2 border-b-beige-600 px-4 py-3 gap-3")}>
			<div className={cn("flex flex-col gap-2")}>
				<TypographyHeading size={TypographyHeadingSize.XX_SMALL}>
					{title}
				</TypographyHeading>
				<TypographyUI size={TypographyUISize.SMALL} isQuiet>
					{subtitle}
				</TypographyUI>
			</div>
			<div className={cn("flex flex-col items-end gap-3 py-1.5")}>
				<TypographyUI
					className={cn("flex items-center gap-0.5")}
					size={TypographyUISize.SMALL}
				>
					<Product24CameraFlash />
					{power}kW
				</TypographyUI>
				{!isVisited && (
					<Tag
						as="span"
						variant={TagVariant.WARNING}
						size={TagSize.SMALL}
						className={cn("scale-[0.85]")}
					>
						Not visited
					</Tag>
				)}
			</div>
			<div className={cn("flex items-center")}>
				<Button type={ButtonType.TONAL} size={ButtonSize.X_SMALL}>
					See rates
				</Button>
			</div>
		</li>
	);
};
