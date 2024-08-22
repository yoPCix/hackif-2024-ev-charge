import { cn } from "@/utils/cn";
import { Button, ButtonSize, ButtonType } from "@ids/react-button";
import { CheckboxInput } from "@ids/react-checkbox";
import { Product24CameraFlash } from "@ids/react-icons";
import {
	TypographyHeading,
	TypographyHeadingSize,
	TypographyUI,
	TypographyUISize,
} from "@ids/react-typography";
import React, { useState } from "react";

export type WaypointListItem = {
	title: string;
	subtitle: string;
	power?: number;
	latitude: number;
	longitude: number;
};

export type WaypointListItemProps = WaypointListItem & {
	isWaypoint?: boolean;
	handleCheck: () => void;
	handleClick: () => void;
};

export const WaypointListItem: React.FC<WaypointListItemProps> = ({
	title,
	subtitle,
	isWaypoint,
	power,
	handleCheck,
	handleClick,
}) => {
	const [isChecked, setIsChecked] = useState(false);

	return (
		<li className={cn("flex border-b-2 border-b-beige-600 px-4 py-3 gap-3")}>
			<div className={cn("flex flex-col gap-2 flex-grow")}>
				<div className={cn("flex items-center gap-2")}>
					{isWaypoint && (
						<CheckboxInput
							id={title}
							checked={isChecked}
							onChange={() => {
								handleCheck();
								setIsChecked(!isChecked);
							}}
						/>
					)}
					<TypographyHeading
						size={TypographyHeadingSize.XX_SMALL}
						className={cn("flex-grow")}
					>
						{title}
					</TypographyHeading>
					{power && (
						<TypographyUI
							className={cn("flex items-center gap-0.5")}
							size={TypographyUISize.SMALL}
						>
							<Product24CameraFlash />
							{power}kW
						</TypographyUI>
					)}
				</div>
				<TypographyUI size={TypographyUISize.SMALL} isQuiet>
					{subtitle}
				</TypographyUI>
			</div>
			<div className={cn("flex items-center")}>
				<Button
					type={ButtonType.TONAL}
					size={ButtonSize.X_SMALL}
					onClick={handleClick}
				>
					{isWaypoint ? "See more" : "See rates"}
				</Button>
			</div>
		</li>
	);
};
