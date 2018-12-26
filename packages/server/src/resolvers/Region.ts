import { RegionResolvers } from "../api/ResolverTypes";
import { Location } from "../api/SchemaTypes";
import { LocationResponse } from "../data/PokeApiResponse";
import { fetchPokeApiByNamedUrl } from "../utils/PokeApiHelper";
import { filterNamesByLanguages } from "./Common";

export const Region: RegionResolvers.Type = {
    ...RegionResolvers.defaultResolvers,
    locations: async ({ locations }): Promise<Location[]> =>
        Promise.all(locations.map(async ({ url }) => fetchPokeApiByNamedUrl<LocationResponse>(url))),
    names: async ({ names }, { languages }) => filterNamesByLanguages(names, languages),
};
