import { FlavorTextResolvers } from "../api/ResolverTypes";
import { LanguageResponse, VersionResponse } from "../data/PokeApiResponse";
import { fetchPokeApiByNamedUrl } from "../utils/PokeApiHelper";

export const FlavorText: FlavorTextResolvers.Type = {
    ...FlavorTextResolvers.defaultResolvers,
    language: async ({ language: { url } }) => fetchPokeApiByNamedUrl<LanguageResponse>(url),
    version: async ({ version: { url } }) => fetchPokeApiByNamedUrl<VersionResponse>(url),
};
