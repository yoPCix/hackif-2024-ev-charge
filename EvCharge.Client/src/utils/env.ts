import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	client: {
		VITE_API_PORT: z.coerce.number(),
		VITE_GOOGLE_MAPS_API_KEY: z.string(),
	},
	clientPrefix: "VITE_",
	runtimeEnv: {
		VITE_API_PORT: import.meta.env.VITE_API_PORT,
		VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	},
});
