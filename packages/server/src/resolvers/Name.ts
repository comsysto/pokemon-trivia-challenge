import { NameResolvers } from "../api/ResolverTypes";
import { LanguageResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const Name: NameResolvers.Type = {
    ...NameResolvers.defaultResolvers,
    language: async ({ language: { name } }) => {
        return fetchPokeApi<LanguageResponse>("language", { name });
    },
};
