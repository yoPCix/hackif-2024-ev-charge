import { PlacesApiClient } from "@/api/PlacesApiClient";
import { WaypointList } from "@/components/adhoc/WaypointList";
import { useGoogleMaps } from "@/components/context/GoogleMapProvider";
import { mockWaypoints } from "@/data/mock/waypoints";
import { cn } from "@/utils/cn";
import React from "react";
import { useQuery } from "react-query";

export const StationsPage: React.FC = () => {
	const { MapView, setMarkers } = useGoogleMaps();
	const { data: places } = useQuery({
		queryKey: ["places", "list"],
		queryFn: PlacesApiClient.getPlaces,
		onSuccess: (places) => {
			setMarkers(
				places.map((place) => ({
					position: { lat: place.latitude, lng: place.longitude },
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
					places?.map(({ name, address, ...item }) => ({
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
