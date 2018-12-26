import { RegionResolvers } from "../api/ResolverTypes";
import { Location } from "../api/SchemaTypes";
import { LocationResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";
import { filterNamesByLanguages } from "./Common";

export const Region: RegionResolvers.Type = {
    ...RegionResolvers.defaultResolvers,
    locations: async ({ locations }): Promise<Location[]> => {
        return Promise.all(locations.map(async ({ name }) => fetchPokeApi<LocationResponse>("location", name)));
    },
    names: async ({ names }, { languages }) => filterNamesByLanguages(names, languages),
};
