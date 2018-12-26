import { camelize } from "@ridi/object-case-converter";
import { PokemonEncounterResolvers } from "../api/ResolverTypes";
import { Pokemon } from "../api/SchemaTypes";
import { PokemonResponse } from "../data/PokeApiResponse";
import { fetchPokeApiByNamedUrl } from "../utils/PokeApiHelper";

export const PokemonEncounter: PokemonEncounterResolvers.Type = {
    ...PokemonEncounterResolvers.defaultResolvers,
    pokemon: async ({ pokemon: { url } }) => {
        const pokemonResponse = await fetchPokeApiByNamedUrl<PokemonResponse>(url);
        return camelize<Pokemon>(pokemonResponse, { recursive: true });
    },
};
