import { PokemonSpeciesResolvers } from "../api/ResolverTypes";
import { filterNamesByLanguages } from "./Common";

export const PokemonSpecies: PokemonSpeciesResolvers.Type = {
    ...PokemonSpeciesResolvers.defaultResolvers,
    names: async ({ names }, { languages }) => filterNamesByLanguages(names, languages),
};
