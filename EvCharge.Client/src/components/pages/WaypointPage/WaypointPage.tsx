import { PlacesApiClient } from "@/api/PlacesApiClient";
import { WaypointList } from "@/components/adhoc/WaypointList";
import { useGoogleMaps } from "@/components/context/GoogleMapProvider";
import { mockWaypoints } from "@/data/mock/waypoints";
import { cn } from "@/utils/cn";
import React from "react";
import { useQuery } from "react-query";

export const WaypointPage: React.FC = () => {
	const { MapView, map, setMarkers } = useGoogleMaps();
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
			<div className={cn("w-full flex-grow")}>{MapView}</div>
			<WaypointList
				isWaypoint={true}
				items={
					places?.map(({ name, address, ...place }) => ({
						title: name,
						subtitle: address,
						...place,
					})) ?? []
				}
			/>
		</div>
	);
};
