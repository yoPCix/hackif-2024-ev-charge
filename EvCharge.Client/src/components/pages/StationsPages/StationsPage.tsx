import { PlacesApiClient } from "@/api/PlacesApiClient";
import { StationsApiClient } from "@/api/StationsApiClient";
import { WaypointList } from "@/components/adhoc/WaypointList";
import { useGoogleMaps } from "@/components/context/GoogleMapProvider";
import { mockWaypoints } from "@/data/mock/waypoints";
import { cn } from "@/utils/cn";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

export const StationsPage: React.FC = () => {
	const { MapView, setMarkers } = useGoogleMaps();
	const { data: stations } = useQuery({
		queryKey: ["stations", "list"],
		queryFn: StationsApiClient.getStations,
		onSuccess: (stations) => {
			setMarkers(
				stations.map((station) => ({
					position: { lat: station.latitude, lng: station.longitude },
				}))
			);
		},
	});

	return (
		<div className={cn("flex flex-col items-stretch h-full")}>
			<div className={cn("w-full flex-grow bg-red-500")}>{MapView}</div>
			<WaypointList
				isWaypoint={false}
				items={
					stations?.map(({ name, address, ...item }) => ({
						title: name,
						subtitle: address,
						power: 10,
						...item,
					})) ?? []
				}
			/>
		</div>
	);
};
