import { camelize } from "@ridi/object-case-converter";
import { LocationResolvers } from "../api/ResolverTypes";
import { LocationArea, Region } from "../api/SchemaTypes";
import { LocationAreaResponse, RegionResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const Location: LocationResolvers.Type = {
    ...LocationResolvers.defaultResolvers,
    region: async ({ region: { name } }): Promise<Region> => {
        const { id, names, locations } = await fetchPokeApi<RegionResponse>("region", { name });
        return { id, name, names, locations };
    },
    areas: async ({ areas }): Promise<LocationArea[]> => {
        return Promise.all(
            areas.map(async ({ name }) => {
                const { id, names, location, pokemon_encounters: pokemonEncounters } = await fetchPokeApi<
                    LocationAreaResponse
                >("location-area", { name });
                return camelize<LocationArea>({ id, name, names, location, pokemonEncounters }, { recursive: true });
            })
        );
    },
};
