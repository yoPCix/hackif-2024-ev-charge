import { cn } from "@/utils/cn";
import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@/components/ui/Box";
import { GoogleMap, useJsApiLoader, Data } from "@react-google-maps/api";
import { env } from "@/utils/env";
import {
	Product24CameraFlash,
	Product24TimeShareAbroad,
	Ui24User,
} from "@ids/react-icons";
import {
	TypographyHeading,
	TypographyUI,
	TypographyUISize,
} from "@ids/react-typography";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { StationsApiClient } from "@/api/StationsApiClient";
import { useGeolocated } from "react-geolocated";
import { Loader, LoaderSize, LoaderType } from "@ids/react-loader";

const center: google.maps.LatLngLiteral = {
	lat: 56.95148884465696,
	lng: 24.11329878216981,

};

const HomePageConstants = {
	BOTTOM_OFFSET: 50,
	MAP_ID: "127d18f654676a3b",
};

export const HomePage: React.FC = () => {
	const { coords, isGeolocationAvailable, isGeolocationEnabled } =
		useGeolocated({
			positionOptions: { enableHighAccuracy: true },
			userDecisionTimeout: 10000,
		});
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: env.VITE_GOOGLE_MAPS_API_KEY,
	});
	const { data: stations } = useQuery({
		queryKey: ["stations", "list"],
		queryFn: async () => await StationsApiClient.getStations(),
		onSuccess: async (stations) => {
			const MarkerLibrary = (await google.maps.importLibrary(
				"marker"
			)) as google.maps.MarkerLibrary;

			stations.forEach((station) => {
				const pin = new MarkerLibrary.PinElement({
					background: "#2196F3",
					borderColor: "#1E88E5",
					glyphColor: "#1E88E5",
					// glyph: "",
				});

				const marker = new MarkerLibrary.AdvancedMarkerElement({
					map,
					position: {
						lat: station.latitude,
						lng: station.longitude,
					},
					content: pin.element,
				});
			});
		},
	});

	const [map, setMap] = useState<google.maps.Map | null>(null);

	const onLoad = useCallback((map: google.maps.Map) => {
		map.setCenter(center);

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

	useEffect(() => {
		if (!map) {
			return;
		}

		const run = async () => {};

		run();
	}, [map]);

	return (
		<div className={cn("flex flex-col items-stretch h-full")}>
			{isLoaded ? (
				<GoogleMap
					id={HomePageConstants.MAP_ID}
					mapContainerStyle={{
						width: "100%",
						height: `calc(100% - ${HomePageConstants.BOTTOM_OFFSET}px)`,
					}}
					center={center}
					zoom={10}
					onLoad={onLoad}
					onUnmount={onUnmount}
					mapTypeId={google.maps.MapTypeId.TERRAIN}
					options={{
						mapId: HomePageConstants.MAP_ID,
						streetViewControl: false,
						fullscreenControl: false,
						zoomControl: false,
						mapTypeControl: false,
						mapTypeId: google.maps.MapTypeId.TERRAIN,
					}}
				/>
			) : (
				<div
					className={cn(
						"flex flex-col items-center justify-center h-full max-w-[90%] mx-auto"
					)}
				>
					{!isGeolocationAvailable ? (
						<TypographyHeading className={cn("text-center")}>
							Geo-location is not available on your device
						</TypographyHeading>
					) : !isGeolocationEnabled ? (
						<TypographyHeading className={cn("text-center")}>
							Geo-location is not enabled on your browser
						</TypographyHeading>
					) : (
						<Loader type={LoaderType.DOTS} size={LoaderSize.LARGE} />
					)}
				</div>
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
				style={{ height: HomePageConstants.BOTTOM_OFFSET }}
			/>
		</div>
	);
};
