import axios from "axios";

const apiEndpoint = "https://pokeapi.co/api/v2/";

function getApiUrl(endpoint: string) {
    return `${apiEndpoint}${endpoint}`;
}

export interface PokeApiWhere {
    id?: number;
    name?: string;
}

type PokeApiEndpoint = "region" | "language";

export async function fetchPokeApi<ReturnType>(endpoint: PokeApiEndpoint, where?: PokeApiWhere) {
    const apiUrl = getApiUrl(`${endpoint}/${where !== undefined ? where.id || where.name : ""}`);
    const request = await axios.get<ReturnType>(apiUrl);
    console.log(`GET ${apiUrl}`);
    return request.data;
}
