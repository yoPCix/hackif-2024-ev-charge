import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HeaderLayout } from "../layout/HeaderLayout";
import { HomePage } from "../pages/HomePage";
import { WaypointPage } from "../pages/WaypointPage";
import { StationsPage } from "../pages/StationsPages";

export const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HeaderLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/stations" element={<StationsPage />} />
					<Route path="/waypoints" element={<WaypointPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
