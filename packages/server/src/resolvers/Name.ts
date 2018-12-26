import { NameResolvers } from "../api/ResolverTypes";
import { LanguageResponse } from "../data/PokeApiResponse";
import { fetchPokeApiByNamedUrl } from "../utils/PokeApiHelper";

export const Name: NameResolvers.Type = {
    ...NameResolvers.defaultResolvers,
    language: async ({ language: { url } }) => fetchPokeApiByNamedUrl<LanguageResponse>(url),
};
