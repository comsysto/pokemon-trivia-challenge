import { LocationAreaResolvers } from "../api/ResolverTypes";
import { LocationResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const LocationArea: LocationAreaResolvers.Type = {
    ...LocationAreaResolvers.defaultResolvers,
    location: async ({ location: { name } }) => {
        return fetchPokeApi<LocationResponse>("location", { name });
    },
};
