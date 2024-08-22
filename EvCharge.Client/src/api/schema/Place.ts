import { z } from "zod";

export const placeSchema = z.object({
	id: z.string(),
	name: z.string(),
	address: z.string(),
	latitude: z.number(),
	longitude: z.number(),
});

export const placesSchema = z.array(placeSchema);

export type Place = z.infer<typeof placeSchema>;
