import { LocationAreaResolvers } from "../api/ResolverTypes";
import { Location } from "../api/SchemaTypes";
import { LocationResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const LocationArea: LocationAreaResolvers.Type = {
    ...LocationAreaResolvers.defaultResolvers,
    location: async ({ location: { name } }): Promise<Location> => {
        const { id, names, region, areas } = await fetchPokeApi<LocationResponse>("location", { name });
        return { id, name, names, region, areas };
    },
};
