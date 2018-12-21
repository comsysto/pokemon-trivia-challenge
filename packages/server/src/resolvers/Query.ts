import { QueryResolvers } from "../api/ResolverTypes";
import { Location, Question, Region } from "../api/SchemaTypes";
import { LocationResponse, NamedResourceListResponse, RegionResponse } from "../data/PokeApiResponse";
import { fetchOpenTriviaDbApi } from "../utils/OpenTriviaDbApiHelper";
import { fetchPokeApi } from "../utils/PokeApiHelper";

export const Query: QueryResolvers.Type = {
    ...QueryResolvers.defaultResolvers,
    triviaQuestion: async (_, args): Promise<Question> => {
        const { results } = await fetchOpenTriviaDbApi(args);
        const result = results[0];
        return {
            category: result.category,
            correctAnswer: result.correct_answer,
            difficulty: result.difficulty,
            incorrectAnswers: result.incorrect_answers,
            question: result.question,
            type: result.type,
        };
    },
    location: async (_, { id }): Promise<Location> => {
        const { name, names, region, areas } = await fetchPokeApi<LocationResponse>("location", { id });
        return { id, name, names, region, areas };
    },
    locations: async (): Promise<Location[]> => {
        const { results } = await fetchPokeApi<NamedResourceListResponse<LocationResponse[]>>("location");
        return Promise.all(results.map(async ({ name }) => fetchPokeApi<LocationResponse>("location", { name })));
    },
    region: async (_, { id }): Promise<Region> => {
        const { name, names, locations } = await fetchPokeApi<RegionResponse>("region", { id });
        return { id, name, names, locations };
    },
    regions: async (): Promise<Region[]> => {
        const { results } = await fetchPokeApi<NamedResourceListResponse<RegionResponse[]>>("region");
        return Promise.all(results.map(async ({ name }) => fetchPokeApi<RegionResponse>("region", { name })));
    },
};
