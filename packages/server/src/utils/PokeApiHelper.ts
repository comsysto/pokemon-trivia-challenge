import axios from "axios";
import { createHandyClient } from "handy-redis";

const isLocal = true;

const officialBaseUrl = "https://pokeapi.co";
const localBaseUrl = "http://localhost:7894";
const apiUrl = "/api/v2/";

export type PokeApiEndpoint =
    | "region"
    | "language"
    | "location"
    | "location-area"
    | "pokemon"
    | "pokemon-species"
    | "version";

const redisClient = createHandyClient({ port: 6541 });

export async function fetchPokeApiByQuery<ResponseType>(endpoint: PokeApiEndpoint, argument?: string) {
    const url = `${isLocal ? "" : officialBaseUrl}${apiUrl}${endpoint}/${argument || ""}`;
    return fetchPokeApiByNamedUrl<ResponseType>(url);
}

export async function fetchPokeApiByNamedUrl<ResponseType>(url: string) {
    const apiEndpoint = `${url.startsWith(officialBaseUrl) ? "" : localBaseUrl}${url}`;
    const cachedData = await redisClient.get(apiEndpoint);

    if (cachedData === null) {
        const { data } = await axios.get<ResponseType>(apiEndpoint);

        // Allow access by name as well
        const namedApiEndpointAlias = `${[
            ...apiEndpoint.split("/").slice(0, -2),
            ((data as unknown) as { name: string }).name,
        ].join("/")}/`;
        const stringifiedData = JSON.stringify(data);

        await Promise.all([
            redisClient.set(apiEndpoint, stringifiedData),
            redisClient.set(namedApiEndpointAlias, stringifiedData),
        ]);

        return data;
    } else {
        return JSON.parse(cachedData) as ResponseType;
    }
}
