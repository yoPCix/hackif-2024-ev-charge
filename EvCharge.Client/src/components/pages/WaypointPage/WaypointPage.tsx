import { WaypointList } from "@/components/adhoc/WaypointList";
import { mockWaypoints } from "@/data/mock/waypoints";
import { cn } from "@/utils/cn";
import React from "react";

export const WaypointPage: React.FC = () => {
	return (
		<div className={cn("flex flex-col items-stretch h-full")}>
			<div className={cn("w-full flex-grow bg-red-500")}>
				google map preview
			</div>
			<WaypointList isWaypoint={true} items={mockWaypoints} />
		</div>
	);
};
