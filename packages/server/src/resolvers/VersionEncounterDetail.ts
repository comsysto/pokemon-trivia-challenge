import { VersionEncounterDetailResolvers } from "../api/ResolverTypes";
import { VersionResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const VersionEncounterDetail: VersionEncounterDetailResolvers.Type = {
    ...VersionEncounterDetailResolvers.defaultResolvers,
    version: async ({ version: { name } }) => {
        return fetchPokeApi<VersionResponse>("version", { name });
    },
};
