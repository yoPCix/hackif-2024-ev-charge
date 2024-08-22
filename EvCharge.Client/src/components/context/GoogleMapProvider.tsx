import { cn } from "@/utils/cn";
import { env } from "@/utils/env";
import { Loader, LoaderType, LoaderSize } from "@ids/react-loader";
import { TypographyHeading } from "@ids/react-typography";
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	MarkerProps,
} from "@react-google-maps/api";
import React, {
	createContext,
	Dispatch,
	PropsWithChildren,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useState,
} from "react";
import { useGeolocated } from "react-geolocated";

export type GoogleMapContext = {
	MapView: ReactNode;
	map?: google.maps.Map;
	isLoaded: boolean;
	setMarkers: Dispatch<SetStateAction<MarkerProps[]>>;
};

const center: google.maps.LatLngLiteral = {
	lat: 56.95148884465696,
	lng: 24.11329878216981,
};

export const GoogleMapConstants = {
	BOTTOM_OFFSET: 50,
	MAP_ID: "127d18f654676a3b",
};

export const GoogleMapContext = createContext({} as GoogleMapContext);

export const GoogleMapProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const [markers, setMarkers] = useState<MarkerProps[]>([]);

	const { coords, isGeolocationAvailable, isGeolocationEnabled } =
		useGeolocated({
			positionOptions: { enableHighAccuracy: true },
			userDecisionTimeout: 10000,
		});
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: env.VITE_GOOGLE_MAPS_API_KEY,
	});

	const [map, setMap] = useState<google.maps.Map>();

	const onLoad = useCallback((map: google.maps.Map) => {
		map.setCenter(center);

		setMap(map);
	}, []);

	const onUnmount = useCallback(() => {
		console.log("unmounting");
		// setMap(undefined);
	}, []);

	const MapView = isLoaded ? (
		<GoogleMap
			id={GoogleMapConstants.MAP_ID}
			mapContainerStyle={{
				width: "100%",
				height: "100%",
			}}
			center={center}
			zoom={12}
			onLoad={onLoad}
			onUnmount={onUnmount}
			mapTypeId={google.maps.MapTypeId.TERRAIN}
			options={{
				mapId: GoogleMapConstants.MAP_ID,
				streetViewControl: false,
				fullscreenControl: false,
				zoomControl: false,
				mapTypeControl: false,
				mapTypeId: google.maps.MapTypeId.TERRAIN,
			}}
		>
			{markers.map(({ position, ...marker }) => (
				<Marker
					key={`${position.lat}|${position.lng}`}
					position={position}
					{...marker}
				/>
			))}
		</GoogleMap>
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
	);

	const context: GoogleMapContext = { map, MapView, isLoaded, setMarkers };

	return (
		<GoogleMapContext.Provider value={context}>
			{children}
		</GoogleMapContext.Provider>
	);
};

export const useGoogleMaps = () => useContext(GoogleMapContext);
