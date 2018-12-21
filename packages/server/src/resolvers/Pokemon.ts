import { PokemonResolvers } from "../api/ResolverTypes";
import { FlavorText, PokemonSpecies } from "../api/SchemaTypes";
import { PokemonSpeciesResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const Pokemon: PokemonResolvers.Type = {
    ...PokemonResolvers.defaultResolvers,
    species: async ({ species: { name } }): Promise<PokemonSpecies> => {
        const { id, names, capture_rate: captureRate, flavor_text_entries } = await fetchPokeApi<
            PokemonSpeciesResponse
        >("pokemon-species", { name });
        const flavorTextEntries = flavor_text_entries.map(
            ({ flavor_text, language, version }): FlavorText => ({
                flavorText: flavor_text,
                language,
                version,
            })
        );
        return { id, name, names, captureRate, flavorTextEntries };
    },
};
