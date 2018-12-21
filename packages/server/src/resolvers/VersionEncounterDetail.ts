import { VersionEncounterDetailResolvers } from "../api/ResolverTypes";
import { Version } from "../api/SchemaTypes";
import { VersionResponse } from "../data/PokeApiResponse";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const VersionEncounterDetail: VersionEncounterDetailResolvers.Type = {
    ...VersionEncounterDetailResolvers.defaultResolvers,
    version: async ({ version: { name } }): Promise<Version> => {
        const { id, names } = await fetchPokeApi<VersionResponse>("version", { name });
        return { id, name, names };
    },
};
