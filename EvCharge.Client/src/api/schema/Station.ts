import { z } from "zod";

export const stationSchema = z.object({
	id: z.string(),
	name: z.string(),
	address: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	chargingSlotCount: z.number(),
	status: z.string(),
	power: z.string()
});

export const stationsSchema = z.array(stationSchema);

export type Station = z.infer<typeof stationSchema>;
