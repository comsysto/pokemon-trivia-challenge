import { camelize } from "@ridi/object-case-converter";
import { QueryResolvers } from "../api/ResolverTypes";
import { Location, Question, Region } from "../api/SchemaTypes";
import { LocationResponse, NamedResourceListResponse, RegionResponse } from "../data/PokeApiResponse";
import { fetchOpenTriviaDbApi } from "../utils/OpenTriviaDbApiHelper";
import { fetchPokeApiByNamedUrl, fetchPokeApiByQuery } from "../utils/PokeApiHelper";

export const Query: QueryResolvers.Type = {
    ...QueryResolvers.defaultResolvers,
    triviaQuestion: async (_, args): Promise<Question> => {
        const { response_code: responseCode, results } = await fetchOpenTriviaDbApi(args);
        if (responseCode === 200) {
            const result = results[0];
            return camelize<Question>(result, { recursive: true });
        } else {
            throw new Error(`OpenTriviaDBAPI Response Code: ${responseCode}`);
        }
    },
    location: async (_, { id }): Promise<Location> => {
        const locationResponse = await fetchPokeApiByQuery<LocationResponse>("location", id);
        return { id, ...locationResponse };
    },
    locations: async (): Promise<Location[]> => {
        const { results } = await fetchPokeApiByQuery<NamedResourceListResponse<LocationResponse[]>>("location");
        return Promise.all(results.map(async ({ url }) => fetchPokeApiByNamedUrl<LocationResponse>(url)));
    },
    region: async (_, { id }): Promise<Region> => {
        const regionResponse = await fetchPokeApiByQuery<RegionResponse>("region", id);
        return { id, ...regionResponse };
    },
    regions: async (): Promise<Region[]> => {
        const { results } = await fetchPokeApiByQuery<NamedResourceListResponse<RegionResponse[]>>("region");
        return Promise.all(results.map(async ({ url }) => fetchPokeApiByNamedUrl<RegionResponse>(url)));
    },
};
