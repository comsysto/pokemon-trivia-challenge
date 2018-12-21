import axios from "axios";

const apiEndpoint = "https://pokeapi.co/api/v2/";

type PokeApiEndpoint = "region" | "language" | "location" | "location-area";

export interface PokeApiWhere {
    id?: number;
    name?: string;
}

// tslint:disable-next-line:no-any
const cachedResponses: Record<string, any> = {};

function buildUrl(endpoint: string) {
    return `${apiEndpoint}${endpoint}`;
}

export async function fetchPokeApi<ResponseType>(endpoint: PokeApiEndpoint, where?: PokeApiWhere) {
    const apiUrl = buildUrl(`${endpoint}/${where !== undefined ? where.id || where.name : ""}`);
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
