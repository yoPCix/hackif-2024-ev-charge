import { cn } from "@/utils/cn";
import { Button, ButtonSize } from "@ids/react-button";
import React from "react";
import { WaypointList } from "../../adhoc/WaypointList";
import { mockWaypoints } from "@/data/mock/waypoints";
import { Box } from "@/components/ui/Box";

export const HomePage: React.FC = () => {
	return (
		<div className={cn("flex flex-col items-stretch h-full")}>
			<Box
				variant="light"
				className={cn("fixed left-0 bottom-0 right-0 h-10")}
			/>
		</div>
	);
};
