import { camelize } from "@ridi/object-case-converter";
import { PokemonResolvers } from "../api/ResolverTypes";
import { PokemonSpecies } from "../api/SchemaTypes";
import { PokemonSpeciesResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const Pokemon: PokemonResolvers.Type = {
    ...PokemonResolvers.defaultResolvers,
    species: async ({ species: { name } }): Promise<PokemonSpecies> => {
        const { id, names, capture_rate: captureRate, flavor_text_entries: flavorTextEntries } = await fetchPokeApi<
            PokemonSpeciesResponse
        >("pokemon-species", { name });
        return camelize<PokemonSpecies>({ id, name, names, captureRate, flavorTextEntries }, { recursive: true });
    },
};
