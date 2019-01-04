import { DocumentNode } from "graphql";
import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

export const QuestionQueryString = gql`
    query TriviaQuestion($difficulty: QuestionDifficulty) {
        triviaQuestion(difficulty: $difficulty, type: MULTIPLE) {
            question
            correctAnswer
            incorrectAnswers
        }
    }
` as DocumentNode;

export type QuestionQueryResponse = {
    triviaQuestion: {
        question: string;
        correctAnswer: string;
        incorrectAnswers: string[];
    };
};

export type QuestionQueryVariables = {
    difficulty: string;
};

export class QuestionQuery extends Query<QuestionQueryResponse, QuestionQueryVariables> {
    public static defaultProps: Partial<QueryProps> = {
        query: QuestionQueryString,
    };
}
