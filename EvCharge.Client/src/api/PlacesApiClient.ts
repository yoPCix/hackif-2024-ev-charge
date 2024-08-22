import { env } from "@/utils/env";
import axios from "axios";
import { Place, placesSchema } from "./schema/Place";
import { ApiResult } from ".";

export class PlacesApiClient {
	private static _serverHost = import.meta.env.DEV
		? `https://localhost:${env.VITE_API_PORT}`
		: "";
	private static _placesPath = "/api/places";

	private static _httpClient = axios.create({
		baseURL: `${this._serverHost}${this._placesPath}`,
	});

	static getPlaces = async (): Promise<Place[]> => {
		try {
			const response = await this._httpClient.get("/");

			const parseResult = await placesSchema.safeParseAsync(response.data);

			if (!parseResult.success) {
				return [];
			}

			return parseResult.data;
		} catch (err) {
			return [];
		}
	};

	static getPlacesWithin = async (
		distance: number,
		polyline: string
	): Promise<ApiResult<Place[]>> => {
		try {
			const response = await this._httpClient.post(`/within/${distance}`, {
				polyline,
			});

			const parseResult = await placesSchema.safeParseAsync(response.data);

			if (!parseResult.success) {
				return {
					ok: false,
					error: "Invalid polyline",
				};
			}

			return {
				ok: true,
				payload: parseResult.data,
			};
		} catch (err) {
			return { ok: false, error: "Invalid polyline" };
		}
	};
}
