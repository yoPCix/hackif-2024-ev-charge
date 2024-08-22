import { cn } from "@/utils/cn";
import React, { useCallback, useState } from "react";
import { Box } from "@/components/ui/Box";
import { GoogleMap, useJsApiLoader, Data } from "@react-google-maps/api";
import { env } from "@/utils/env";
import {
	Product24CameraFlash,
	Product24TimeShareAbroad,
	Ui24User,
} from "@ids/react-icons";
import { TypographyUI, TypographyUISize } from "@ids/react-typography";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { StationsApiClient } from "@/api/StationsApiClient";

const center: google.maps.LatLngLiteral = {
	lat: 56.95148884465696,
	lng: 24.11329878216981,
};

const HomePageConstants = {
	BOTTOM_OFFSET: 50,
};

export const HomePage: React.FC = () => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: env.VITE_GOOGLE_MAPS_API_KEY,
	});
	const { data: stations } = useQuery({
		queryKey: ["stations", "list"],
		queryFn: async () => await StationsApiClient.getStations(),
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

	const navigate = useNavigate();

	const initialOptions = [
		{
			Logo: Product24CameraFlash,
			label: "Charging stations",
			onClick: () => navigate("/stations"),
		},
		{
			Logo: Product24TimeShareAbroad,
			label: "Places to visit",
			onClick: () => {},
		},
		{
			Logo: Ui24User,
			label: "My loyalty program",
			onClick: () => {},
		},
	];

	return (
		<div className={cn("flex flex-col items-stretch h-full")}>
			{isLoaded ? (
				<GoogleMap
					mapContainerStyle={{
						width: "100%",
						height: `calc(100% - ${HomePageConstants.BOTTOM_OFFSET}px)`,
					}}
					center={center}
					zoom={16}
					onLoad={onLoad}
					onUnmount={onUnmount}
					mapTypeId="terrain"
					options={{
						streetViewControl: false,
						fullscreenControl: false,
						zoomControl: false,
						mapTypeControl: false,

						mapTypeId: google.maps.MapTypeId.TERRAIN,
					}}
				></GoogleMap>
			) : (
				<React.Fragment />
			)}
			<Box
				variant="extra-light"
				className={cn(
					"flex gap-2 fixed left-1/2 -translate-x-1/2 p-4",
					"rounded-2xl border border-beige-300"
				)}
				style={{
					bottom: `calc(${HomePageConstants.BOTTOM_OFFSET}px + 1rem)`,
				}}
			>
				{initialOptions.map(({ Logo, label, onClick }) => (
					<button
						key={label}
						className={cn(
							"flex flex-col gap-2 items-center text-center w-24 cursor-pointer"
						)}
						onClick={onClick}
					>
						<Logo />
						<TypographyUI size={TypographyUISize.SMALL}>{label}</TypographyUI>
					</button>
				))}
			</Box>
			<Box
				variant="extra-light"
				className={cn(
					"fixed left-0 bottom-0 right-0 border-t border-t-beige-400"
				)}
				style={{
					height: HomePageConstants.BOTTOM_OFFSET,
				}}
			/>
		</div>
	);
};
