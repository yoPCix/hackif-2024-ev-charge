import React from "react";
import { Router } from "../context/Router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({});

export const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router />;
		</QueryClientProvider>
	);
};
