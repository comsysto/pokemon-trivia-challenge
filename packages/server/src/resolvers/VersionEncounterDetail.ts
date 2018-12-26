import { VersionEncounterDetailResolvers } from "../api/ResolverTypes";
import { VersionResponse } from "../data/PokeApiResponse";
import { fetchPokeApiByNamedUrl } from "../utils/PokeApiHelper";

export const VersionEncounterDetail: VersionEncounterDetailResolvers.Type = {
    ...VersionEncounterDetailResolvers.defaultResolvers,
    version: async ({ version: { url } }) => fetchPokeApiByNamedUrl<VersionResponse>(url),
};
