import { FlavorTextResolvers } from "../api/ResolverTypes";
import { Language, Version } from "../api/SchemaTypes";
import { LanguageResponse, VersionResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const FlavorText: FlavorTextResolvers.Type = {
    ...FlavorTextResolvers.defaultResolvers,
    language: async ({ language: { name } }): Promise<Language> => {
        const { id, iso3166, names } = await fetchPokeApi<LanguageResponse>("language", { name });
        return { id, iso3166, name, names };
    },
    version: async ({ version: { name } }): Promise<Version> => {
        const { id, names } = await fetchPokeApi<VersionResponse>("version", { name });
        return { id, name, names };
    },
};
