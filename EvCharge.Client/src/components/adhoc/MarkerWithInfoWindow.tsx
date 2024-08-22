import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { useCallback, useRef, useState } from "react";

export type MarkerWithInfoWindowProps = {
	position: google.maps.LatLngLiteral;
};

export const MarkerWithInfoWindow: React.FC<MarkerWithInfoWindowProps> = ({
	position,
}) => {
	const markerRef = useRef<Marker>(null);

	const [infoWindowShown, setInfoWindowShown] = useState(false);

	// clicking the marker will toggle the infowindow
	const handleMarkerClick = useCallback(
		() => setInfoWindowShown((isShown) => !isShown),
		[]
	);

	// if the maps api closes the infowindow, we have to synchronize our state
	const handleClose = useCallback(() => setInfoWindowShown(false), []);

	return (
		<>
			<Marker ref={markerRef} position={position} onClick={handleMarkerClick} />

			{infoWindowShown && (
				<InfoWindow anchor={markerRef.current} onCloseClick={handleClose}>
					<h2>InfoWindow content!</h2>
					<p>Some arbitrary html to be rendered into the InfoWindow.</p>
				</InfoWindow>
			)}
		</>
	);
};
