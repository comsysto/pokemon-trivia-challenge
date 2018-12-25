import { camelize } from "@ridi/object-case-converter";
import { PokemonResolvers } from "../api/ResolverTypes";
import { PokemonSpecies } from "../api/SchemaTypes";
import { PokemonSpeciesResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const Pokemon: PokemonResolvers.Type = {
    ...PokemonResolvers.defaultResolvers,
    species: async ({ species: { name } }) => {
        const pokemonSpeciesResponse = await fetchPokeApi<PokemonSpeciesResponse>("pokemon-species", { name });
        return camelize<PokemonSpecies>(pokemonSpeciesResponse, { recursive: true });
    },
};
