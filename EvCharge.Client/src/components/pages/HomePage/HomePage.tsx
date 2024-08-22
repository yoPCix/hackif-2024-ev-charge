import { cn } from "@/utils/cn";
import React from "react";
import { Box } from "@/components/ui/Box";
import {
	Product24CameraFlash,
	Product24TimeShareAbroad,
	Ui24User,
} from "@ids/react-icons";
import { TypographyUI, TypographyUISize } from "@ids/react-typography";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { StationsApiClient } from "@/api/StationsApiClient";
import {
	GoogleMapConstants,
	useGoogleMaps,
} from "@/components/context/GoogleMapProvider";

export const HomePage: React.FC = () => {
	const { map, MapView, isLoaded, setMarkers } = useGoogleMaps();

	const { data: stations } = useQuery({
		queryKey: ["stations", "list"],
		queryFn: async () => await StationsApiClient.getStations(),
		enabled: isLoaded,
		onSuccess: async (stations) => {
			setMarkers(
				stations.map(({ id, latitude, longitude }) => ({
					id,
					position: { lat: latitude, lng: longitude },
					clickable: true,
					options: {},
				}))
			);
		},
	});

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
			onClick: () => navigate("/waypoints"),
		},
		{
			Logo: Ui24User,
			label: "My loyalty program",
			onClick: () => {},
		},
	];

	return (
		<div className={cn("flex flex-col items-stretch h-full")}>
			{MapView}
			<Box
				variant="extra-light"
				className={cn(
					"flex gap-2 fixed left-1/2 -translate-x-1/2 p-4",
					"rounded-2xl border border-beige-300"
				)}
				style={{
					bottom: `calc(${GoogleMapConstants.BOTTOM_OFFSET}px + 1rem)`,
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
				style={{ height: GoogleMapConstants.BOTTOM_OFFSET }}
			/>
		</div>
	);
};
