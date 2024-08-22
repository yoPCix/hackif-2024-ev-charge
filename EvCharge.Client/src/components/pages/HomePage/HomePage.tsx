import { cn } from "@/utils/cn";
import React, { useCallback, useState } from "react";
import { Box } from "@/components/ui/Box";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { env } from "@/utils/env";

const center: google.maps.LatLngLiteral = {
	lat: -3.745,
	lng: -38.523,
};

const containerStyle = {};
console.log(env.VITE_GOOGLE_MAPS_API_KEY);
export const HomePage: React.FC = () => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: env.VITE_GOOGLE_MAPS_API_KEY,
	});

	const [map, setMap] = useState<google.maps.Map | null>(null);

	const onLoad = useCallback((map: google.maps.Map) => {
		const bounds = new google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		setMap(map);
	}, []);

	const onUnmount = useCallback(() => {
		setMap(null);
	}, []);

	return (
		<div className={cn("flex flex-col items-stretch h-full")}>
			{isLoaded ? (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={10}
					onLoad={onLoad}
					onUnmount={onUnmount}
				></GoogleMap>
			) : (
				<React.Fragment />
			)}
			<Box
				variant="light"
				className={cn("fixed left-0 bottom-0 right-0 h-10")}
			/>
		</div>
	);
};
