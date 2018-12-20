import { Question, Region } from "../api";
import { RegionResponse, RegionsResponse } from "../data/PokeApiResponse";
import { QueryResolvers } from "../generated/schema";
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
    region: async (_, args): Promise<Region> => {
        const { id, name } = await fetchPokeApi<RegionResponse>("region", { id: args.id });
        return { id, name };
    },
    regions: async () => {
        const { results } = await fetchPokeApi<RegionsResponse>("region");
        return Promise.all(results.map(async ({ name }) => fetchPokeApi<RegionResponse>("region", { name })));
    },
};
