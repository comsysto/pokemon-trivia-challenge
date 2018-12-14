import { GQLResolver } from "../schema";
import { fetchQuestion } from "../utils/OpenTriviaDBApi";

const resolvers: GQLResolver = {
    Query: {
        getQuestion: async (_, args) => {
            const fetchResult = await fetchQuestion(args);

            if (fetchResult.response_code !== 0) {
                throw new Error("Unexpected response code from API server!");
            }

            if (fetchResult.results.length !== 1) {
                throw new Error("Unexpected amount of questions from API server!");
            }

            const question = fetchResult.results[0];

            return {
                category: question.category,
                correctAnswer: question.correct_answer,
                difficulty: question.difficulty,
                incorrectAnswers: question.incorrect_answers,
                question: question.question,
                type: question.type,
            };
        },
    },
};

export default resolvers;
