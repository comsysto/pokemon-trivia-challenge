import { Question, Region } from "../api";
import { RegionResponse, RegionsResponse } from "../data/PokeApi/Region";
import { QueryResolvers } from "../generated/schema";
import { fetchQuestion } from "../utils/OpenTriviaDbApi";
import { fetchPokeApi } from "../utils/PokeApi";

export const Query: QueryResolvers.Type = {
    ...QueryResolvers.defaultResolvers,
    triviaQuestion: async (_, args): Promise<Question> => {
        const { results } = await fetchQuestion(args);
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
        return Promise.all(results.map(({ name }) => fetchPokeApi<RegionResponse>("region", { name })));
    },
};
