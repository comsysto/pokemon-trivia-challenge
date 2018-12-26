import { VersionResolvers } from "../api/ResolverTypes";
import { filterNamesByLanguages } from "./Common";

export const Version: VersionResolvers.Type = {
    ...VersionResolvers.defaultResolvers,
    names: async ({ names }, { languages }) => filterNamesByLanguages(names, languages),
};
