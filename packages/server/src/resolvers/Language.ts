import { LanguageResolvers } from "../api/ResolverTypes";
import { filterNamesByLanguages } from "./Common";

export const Language: LanguageResolvers.Type = {
    ...LanguageResolvers.defaultResolvers,
    names: async ({ names }, { languages }) => filterNamesByLanguages(names, languages),
};
