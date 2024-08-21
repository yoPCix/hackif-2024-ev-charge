import { cn } from "@/utils/cn";
import { Button, ButtonSize } from "@ids/react-button";
import React from "react";
import { WaypointList } from "./WaypointList";
import { mockWaypoints } from "@/data/mock/waypoints";

export const HomePage: React.FC = () => {
	return (
		<div className={cn("flex flex-col items-stretch h-full")}>
			<div className={cn("w-full flex-grow bg-red-500")}>
				google map preview
			</div>
			<WaypointList isWaypoint={true} items={mockWaypoints} />
		</div>
	);
};
