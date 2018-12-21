import { LocationResolvers } from "../api/ResolverTypes";
import { LocationArea, PokemonEncounter, Region, VersionEncounterDetail } from "../api/SchemaTypes";
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
                const { id, names, location, pokemon_encounters } = await fetchPokeApi<LocationAreaResponse>(
                    "location-area",
                    { name }
                );
                const pokemonEncounters = pokemon_encounters.map(
                    ({ pokemon, version_details }): PokemonEncounter => {
                        const versionDetails = version_details.map(
                            ({ version, max_chance, encounter_details }): VersionEncounterDetail => ({
                                encounterDetails: encounter_details,
                                maxChance: max_chance,
                                version,
                            })
                        );
                        return { pokemon, versionDetails };
                    }
                );
                return { id, name, names, location, pokemonEncounters };
            })
        );
    },
};
