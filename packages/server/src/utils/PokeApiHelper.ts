import axios from "axios";
import { createHandyClient } from "handy-redis";
import isDocker from "is-docker";
import * as Constants from "../constants";

// tslint:disable-next-line:no-http-string
const localBaseUrl = `http://${isDocker() ? Constants.pokeapiDockerHost : "localhost"}:${Constants.pokeapiServerPort}`;
const apiUrl = "/api/v2/";

export type PokeApiEndpoint =
    | "region"
    | "language"
    | "location"
    | "location-area"
    | "pokemon"
    | "pokemon-species"
    | "version";

const redisClient = createHandyClient({
    host: isDocker() ? Constants.redisDockerHost : "localhost",
    port: Constants.redisServerPort,
    retry_strategy: (options) => {
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error("Retry time exhausted");
        }
        if (options.attempt > 10) {
            return new Error("Retry attempts exhausted");
        }
        return Math.min(options.attempt * 100, 3000);
    },
});

export async function fetchPokeApiByQuery<ResponseType>(endpoint: PokeApiEndpoint, argument?: string) {
    const { isUsingLocalPokeapi, pokeapiOfficialHost } = Constants;
    const url = `${isUsingLocalPokeapi ? "" : pokeapiOfficialHost}${apiUrl}${endpoint}/${argument || ""}/`;
    return fetchPokeApiByNamedUrl<ResponseType>(url);
}

export async function fetchPokeApiByNamedUrl<ResponseType>(url: string) {
    // Named urls from the official API are prefixed with the correct host. We have to prefix local ones manually.
    const apiEndpoint = `${url.startsWith(Constants.pokeapiOfficialHost) ? "" : localBaseUrl}${url}`;
    const cachedData = await redisClient.get(apiEndpoint);

    if (cachedData === null) {
        const { data } = await axios.get<ResponseType>(apiEndpoint);

        // Allow access by name as well - BLACK MAGIC HAPPENS HERE
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
