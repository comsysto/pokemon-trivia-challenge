import { PokemonSpeciesResolvers } from "../api/ResolverTypes";

export const PokemonSpecies: PokemonSpeciesResolvers.Type = {
    ...PokemonSpeciesResolvers.defaultResolvers,
};
