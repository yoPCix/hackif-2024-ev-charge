import { env } from "@/utils/env";
import axios from "axios";
import { Station, stationsSchema } from "./schema/Station";

export class StationsApiClient {
	private static _serverHost = import.meta.env.DEV
		? `https://localhost:${env.VITE_API_PORT}`
		: "";
	private static _stationsPath = "/api/stations";

	private static _httpClient = axios.create({
		baseURL: `${this._serverHost}${this._stationsPath}`,
	});

	static getStations = async (): Promise<Station[]> => {
		try {
			const response = await this._httpClient.get("/");
			const parseResult = await stationsSchema.safeParseAsync(response.data);

			if (!parseResult.success) {
				return [];
			}

			return parseResult.data;
		} catch (err) {
			return [];
		}
	};
}
