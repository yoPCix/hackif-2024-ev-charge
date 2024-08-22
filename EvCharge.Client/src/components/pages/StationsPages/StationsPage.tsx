import { WaypointList } from "@/components/adhoc/WaypointList";
import { useGoogleMaps } from "@/components/context/GoogleMapProvider";
import { mockWaypoints } from "@/data/mock/waypoints";
import { cn } from "@/utils/cn";
import React from "react";

export const StationsPage: React.FC = () => {
	const { MapView } = useGoogleMaps();
	return (
		<div className={cn("flex flex-col items-stretch h-full")}>
			<div className={cn("w-full flex-grow bg-red-500")}>{MapView}</div>
			<WaypointList isWaypoint={false} items={mockWaypoints} />
		</div>
	);
};
