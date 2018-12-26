import axios from "axios";

const isLocal = false;

const officialBaseUrl = "https://pokeapi.co";
const localBaseUrl = "https://localhost:7894";
const apiUrl = "/api/v2/";

type PokeApiEndpoint = "region" | "language" | "location" | "location-area" | "pokemon" | "pokemon-species" | "version";

// tslint:disable-next-line:no-any
const cachedResponses: Record<string, any> = {};

export async function fetchPokeApiByQuery<ResponseType>(endpoint: PokeApiEndpoint, argument?: string) {
    const url = `${isLocal ? "" : officialBaseUrl}${apiUrl}${endpoint}/${argument || ""}`;
    return fetchPokeApiByNamedUrl<ResponseType>(url);
}

export async function fetchPokeApiByNamedUrl<ResponseType>(url: string) {
    const apiEndpoint = `${url.startsWith(officialBaseUrl) ? "" : localBaseUrl}${url}`;
    if (cachedResponses[apiEndpoint] === undefined) {
        console.log(`[From Server] GET ${apiEndpoint}`);
        const { data } = await axios.get<ResponseType>(apiEndpoint);
        cachedResponses[apiEndpoint] = data;
        return data;
    } else {
        console.log(`[From Cache] GET ${apiEndpoint}`);
        return cachedResponses[apiEndpoint] as ResponseType;
    }
}
