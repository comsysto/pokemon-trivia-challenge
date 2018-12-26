import { LocationAreaResolvers } from "../api/ResolverTypes";
import { LocationResponse } from "../data/PokeApiResponse";
import { fetchPokeApiByNamedUrl } from "../utils/PokeApiHelper";
import { filterNamesByLanguages } from "./Common";

export const LocationArea: LocationAreaResolvers.Type = {
    ...LocationAreaResolvers.defaultResolvers,
    location: async ({ location: { url } }) => fetchPokeApiByNamedUrl<LocationResponse>(url),
    names: async ({ names }, { languages }) => filterNamesByLanguages(names, languages),
};
