import { PlacesApiClient } from "@/api/PlacesApiClient";
import { StationsApiClient } from "@/api/StationsApiClient";
import { WaypointList } from "@/components/adhoc/WaypointList";
import { useGoogleMaps } from "@/components/context/GoogleMapProvider";
import { cn } from "@/utils/cn";
import React from "react";
import { useQuery } from "react-query";

export const WaypointPage: React.FC = () => {
	const { MapView, map, setMarkers } = useGoogleMaps();
	const { data: places } = useQuery({
		queryKey: ["places", "list"],
		queryFn: PlacesApiClient.getPlaces,
		onSuccess: (places) => {
			setMarkers((markers) =>
				[
					...markers,
					...places.map((place) => ({
						id: place.id,
						position: { lat: place.latitude, lng: place.longitude },
						opacity: 0.5,
					})),
				].filter((item) => !markers.some((m) => m.id == item.id))
			);
		},
	});
	const { data: stations } = useQuery({
		queryKey: ["stations", "list"],
		queryFn: StationsApiClient.getStations,
		onSuccess: (stations) => {
			setMarkers((markers) =>
				[
					...markers,
					...stations.map((station, index) => ({
						id: station.id,
						position: { lat: station.latitude, lng: station.longitude },
						label: index.toString(),
					})),
				].filter((item) => !markers.some((m) => m.id == item.id))
			);
		},
	});

	return (
		<div className={cn("flex flex-col items-stretch h-full")}>
			<div className={cn("w-full flex-grow")}>{MapView}</div>
			<WaypointList
				isWaypoint={true}
				items={[...(places ?? []), ...(stations ?? [])].map(
					({ name, address, ...place }) => ({
						title: name,
						subtitle: address,
						...place,
					})
				)}
			/>
		</div>
	);
};
