import { FlavorTextResolvers } from "../api/ResolverTypes";
import { LanguageResponse, VersionResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const FlavorText: FlavorTextResolvers.Type = {
    ...FlavorTextResolvers.defaultResolvers,
    language: async ({ language: { name } }) => {
        return fetchPokeApi<LanguageResponse>("language", name);
    },
    version: async ({ version: { name } }) => {
        return fetchPokeApi<VersionResponse>("version", name);
    },
};
