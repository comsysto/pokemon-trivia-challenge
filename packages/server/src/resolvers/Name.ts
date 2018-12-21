import { NameResolvers } from "../api/ResolverTypes";
import { Language } from "../api/SchemaTypes";
import { LanguageResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const Name: NameResolvers.Type = {
    ...NameResolvers.defaultResolvers,
    language: async ({ language: { name } }): Promise<Language> => {
        const { id, iso3166, names } = await fetchPokeApi<LanguageResponse>("language", { name });
        return { id, iso3166, name, names };
    },
};
