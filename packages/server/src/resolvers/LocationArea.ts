import { LocationAreaResolvers } from "../api/ResolverTypes";
import { LocationResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";
import { filterNamesByLanguages } from "./Common";

export const LocationArea: LocationAreaResolvers.Type = {
    ...LocationAreaResolvers.defaultResolvers,
    location: async ({ location: { name } }) => {
        return fetchPokeApi<LocationResponse>("location", name);
    },
    names: async ({ names }, { languages }) => filterNamesByLanguages(names, languages),
};
