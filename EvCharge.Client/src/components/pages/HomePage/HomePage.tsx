import { cn } from "@/utils/cn";
import { Button } from "@ids/react-button";
import React from "react";
import { WaypointList } from "./WaypointList";
import { mockWaypoints } from "@/data/mock/waypoints";

export const HomePage: React.FC = () => {
	return (
		<div className={cn("flex flex-col items-stretch")}>
			<div className={cn("w-full aspect-square bg-red-500")}>
				google map preview
			</div>
			<WaypointList items={mockWaypoints} />
			<Button className={cn("w-full")}>Set Route</Button>
		</div>
	);
};
