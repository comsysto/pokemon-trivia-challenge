import { camelize } from "@ridi/object-case-converter";
import { LocationResolvers } from "../api/ResolverTypes";
import { LocationArea } from "../api/SchemaTypes";
import { LocationAreaResponse, RegionResponse } from "../data/PokeApiResponse";
import { fetchPokeApiByNamedUrl } from "../utils/PokeApiHelper";
import { filterNamesByLanguages } from "./Common";

export const Location: LocationResolvers.Type = {
    ...LocationResolvers.defaultResolvers,
    region: async ({ region: { url } }) => fetchPokeApiByNamedUrl<RegionResponse>(url),
    areas: async ({ areas }): Promise<LocationArea[]> => {
        return Promise.all(
            areas.map(async ({ url }) => {
                const locationAreaResponse = await fetchPokeApiByNamedUrl<LocationAreaResponse>(url);
                return camelize<LocationArea>(locationAreaResponse, { recursive: true });
            })
        );
    },
    names: async ({ names }, { languages }) => filterNamesByLanguages(names, languages),
};
