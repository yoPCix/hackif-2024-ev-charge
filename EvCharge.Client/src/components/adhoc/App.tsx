import React from "react";
import { Router } from "../context/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleMapProvider } from "../context/GoogleMapProvider";

const queryClient = new QueryClient({});

export const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<GoogleMapProvider>
				<Router />;
			</GoogleMapProvider>
		</QueryClientProvider>
	);
};
