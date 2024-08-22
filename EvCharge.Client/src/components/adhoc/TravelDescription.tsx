import React, { useState } from "react";
import { WaypointListItem } from "./WaypointListItem";
import { cn } from "@/utils/cn";
import { Box } from "@/components/ui/Box";
import { Button, ButtonType } from "@ids/react-button";
import { Product24CameraFlash, Ui24ArrowLeft } from "@ids/react-icons";
import {
	TypographyHeading,
	TypographyHeadingSize,
	TypographyUI,
	TypographyUISize,
	TypographyUIWeight,
} from "@ids/react-typography";

export type TravelDescriptionProps = {
	description: string;
};

const getWaypointKey = (waypoint: WaypointListItem) =>
	`${waypoint.title}|${waypoint.subtitle}`;

export const TravelDescription: React.FC<TravelDescriptionProps> = ({
	description,
}) => {
	
	return (
		<div className={cn("relative h-[350px]")}>
			
			<Box>
			<div className="display-linebreak"> 
        {description} 
     </div>
			</Box>
			
		</div>
	);
};
