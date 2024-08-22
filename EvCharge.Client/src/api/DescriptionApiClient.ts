import { env } from "@/utils/env";
import axios from "axios";

export class DescriptionApiClient {
	private static _serverHost = import.meta.env.DEV
		? `https://localhost:${env.VITE_API_PORT}`
		: "";
	private static _descriptionPath = "/api/description";

	private static _httpClient = axios.create({
		baseURL: `${this._serverHost}${this._descriptionPath}`,
	});

	static getTravelDescription = async (): Promise<string> => {
		try {
			const placeIds = ["1", "2"];
			const response = await this._httpClient.post("/", placeIds);

			return response.data
			
		} catch (err) {
			return '';
		}
	};
}
