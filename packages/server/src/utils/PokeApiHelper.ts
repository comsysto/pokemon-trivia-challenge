import axios from "axios";

const apiEndpoint = "https://pokeapi.co/api/v2/";

type PokeApiEndpoint = "region" | "language" | "location" | "location-area" | "pokemon" | "pokemon-species" | "version";

// tslint:disable-next-line:no-any
const cachedResponses: Record<string, any> = {};

function buildUrl(endpoint: string) {
    return `${apiEndpoint}${endpoint}`;
}

export async function fetchPokeApi<ResponseType>(endpoint: PokeApiEndpoint, argument?: string) {
    const apiUrl = buildUrl(`${endpoint}/${argument || ""}`);
    if (cachedResponses[apiUrl] === undefined) {
        console.log(`[From Server] GET ${apiUrl}`);
        const { data } = await axios.get<ResponseType>(apiUrl);
        cachedResponses[apiUrl] = data;
        return data;
    } else {
        console.log(`[From Cache] GET ${apiUrl}`);
        return cachedResponses[apiUrl] as ResponseType;
    }
}
