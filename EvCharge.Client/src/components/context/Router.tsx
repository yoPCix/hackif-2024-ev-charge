import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HeaderLayout } from "../layout/HeaderLayout";
import { HomePage } from "../pages/HomePage";

export const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HeaderLayout />}>
					<Route path="/" element={<HomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
