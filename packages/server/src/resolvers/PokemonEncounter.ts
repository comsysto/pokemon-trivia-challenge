import { camelize } from "@ridi/object-case-converter";
import { PokemonEncounterResolvers } from "../api/ResolverTypes";
import { Pokemon } from "../api/SchemaTypes";
import { PokemonResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const PokemonEncounter: PokemonEncounterResolvers.Type = {
    ...PokemonEncounterResolvers.defaultResolvers,
    pokemon: async ({ pokemon: { name } }): Promise<Pokemon> => {
        const { id, sprites, species } = await fetchPokeApi<PokemonResponse>("pokemon", { name });
        return camelize<Pokemon>({ id, name, sprites, species }, { recursive: true });
    },
};
