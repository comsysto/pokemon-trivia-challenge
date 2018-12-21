import { PokemonEncounterResolvers } from "../api/ResolverTypes";
import { Pokemon } from "../api/SchemaTypes";
import { PokemonResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const PokemonEncounter: PokemonEncounterResolvers.Type = {
    ...PokemonEncounterResolvers.defaultResolvers,
    pokemon: async ({ pokemon: { name } }): Promise<Pokemon> => {
        const {
            id,
            sprites: { front_default: frontDefault },
            species,
        } = await fetchPokeApi<PokemonResponse>("pokemon", { name });
        return { id, name, sprites: { frontDefault }, species };
    },
};
