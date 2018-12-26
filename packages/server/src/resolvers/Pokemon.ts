import { camelize } from "@ridi/object-case-converter";
import { PokemonResolvers } from "../api/ResolverTypes";
import { PokemonSpecies } from "../api/SchemaTypes";
import { PokemonSpeciesResponse } from "../data/PokeApiResponse";
import { fetchPokeApiByNamedUrl } from "../utils/PokeApiHelper";

export const Pokemon: PokemonResolvers.Type = {
    ...PokemonResolvers.defaultResolvers,
    species: async ({ species: { url } }) => {
        const pokemonSpeciesResponse = await fetchPokeApiByNamedUrl<PokemonSpeciesResponse>(url);
        return camelize<PokemonSpecies>(pokemonSpeciesResponse, { recursive: true });
    },
};
