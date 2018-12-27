import axios from "axios";
import { createHandyClient } from "handy-redis";

const isLocal = true;

const officialBaseUrl = "https://pokeapi.co";
const localBaseUrl = "http://localhost:7894";
const apiUrl = "/api/v2/";

export type PokeApiEndpoint = "region" | "language" | "location" | "location-area" | "pokemon" | "pokemon-species" | "version";

const redisClient = createHandyClient({ port: 6379 });

export async function fetchPokeApiByQuery<ResponseType>(endpoint: PokeApiEndpoint, argument?: string) {
    const url = `${isLocal ? "" : officialBaseUrl}${apiUrl}${endpoint}/${argument || ""}`;
    return fetchPokeApiByNamedUrl<ResponseType>(url);
}

export async function fetchPokeApiByNamedUrl<ResponseType>(url: string) {
    const apiEndpoint = `${url.startsWith(officialBaseUrl) ? "" : localBaseUrl}${url}`;
    const cachedData = await redisClient.get(apiEndpoint);

    if (cachedData === null) {
        console.log(`[From Server] GET ${apiEndpoint}`);
        const { data } = await axios.get<ResponseType>(apiEndpoint);
        await redisClient.set(apiEndpoint, JSON.stringify(data));
        return data;
    } else {
        console.log(`[From Redis] GET ${apiEndpoint}`);
        return JSON.parse(cachedData) as ResponseType;
    }
}
