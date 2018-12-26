import { camelize } from "@ridi/object-case-converter";
import { LocationResolvers } from "../api/ResolverTypes";
import { LocationArea } from "../api/SchemaTypes";
import { LocationAreaResponse, RegionResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";
import { filterNamesByLanguages } from "./Common";

export const Location: LocationResolvers.Type = {
    ...LocationResolvers.defaultResolvers,
    region: async ({ region: { name } }) => {
        return fetchPokeApi<RegionResponse>("region", name);
    },
    areas: async ({ areas }): Promise<LocationArea[]> => {
        return Promise.all(
            areas.map(async ({ name }) => {
                const locationAreaResponse = await fetchPokeApi<LocationAreaResponse>("location-area", name);
                return camelize<LocationArea>(locationAreaResponse, { recursive: true });
            })
        );
    },
    names: async ({ names }, { languages }) => filterNamesByLanguages(names, languages),
};
