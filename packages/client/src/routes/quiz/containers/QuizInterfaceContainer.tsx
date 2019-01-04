import { NonIdealState, Spinner } from "@blueprintjs/core";
import { ApolloQueryResult } from "apollo-client";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { QuestionQuery, QuestionQueryResponse, QuestionQueryVariables } from "../../../api/graphql/QuestionQuery";
import * as Constants from "../../../app/constants";
import { QuizRouteParams } from "../../../Routes";
import { DifficultySelection } from "../components/DifficultySelection";
import { Answer, Question, QuestionProps } from "../components/Question";
import { WithQuizContext, withQuizContext } from "../contexts/QuizContext";

function decodeString(text: string) {
    const el = document.createElement("textarea");
    // tslint:disable-next-line:no-inner-html
    el.innerHTML = text;
    return el.value;
}

// Used to "clear the cache"
let refetchQuestion: (variables?: QuestionQueryVariables) => Promise<ApolloQueryResult<QuestionQueryResponse>>;

type QuizInterfaceContainerBaseProps = WithQuizContext & RouteComponentProps<QuizRouteParams>;

function QuizInterfaceContainerBase(props: QuizInterfaceContainerBaseProps) {
    const {
        quizContext,
        history,
        match: {
            params: { selectedRegion, selectedZone },
        },
    } = props;

    const onFinishExploration = () => {
        history.push(Constants.HomeRoute);
    };

    const onContinueExploration = async () => {
        // Instead of clearing the entire Apollo store we are attempting to refetch the question with the method
        // returned previously and hope for the best. This approach should allows us to keep the data in the store.
        if (quizContext.difficulty) {
            await refetchQuestion({ difficulty: quizContext.difficulty.toUpperCase() });
        }
        history.push(`${Constants.ExploreRoute}/${selectedRegion}/${selectedZone}`);
    };

    // The encounter hasn't been loaded yet
    if (quizContext.encounterData === undefined) {
        return <NonIdealState icon={<Spinner />} />;
    }

    if (quizContext.difficulty === undefined) {
        return <DifficultySelection />;
    } else {
        return (
            <QuestionQuery variables={{ difficulty: quizContext.difficulty.toUpperCase() }}>
                {({ loading, error, data, refetch }) => {
                    refetchQuestion = refetch;

                    if (loading) {
                        return <NonIdealState icon={<Spinner />} />;
                    }

                    if (error) {
                        return (
                            <NonIdealState
                                icon="warning-sign"
                                title="Failed to load question"
                                // tslint:disable-next-line:max-line-length
                                description="An exception has occurred while fetching the question. Please return to the zone selection and try it again."
                            />
                        );
                    }

                    if (!loading && !error && data !== undefined) {
                        const {
                            triviaQuestion: { correctAnswer, incorrectAnswers, question },
                        } = data;

                        const answers: Answer[] = [
                            {
                                text: decodeString(correctAnswer),
                                isCorrect: true,
                            },
                            ...incorrectAnswers.map((answer): Answer => ({ text: decodeString(answer) })),
                        ];

                        const componentProps: QuestionProps = {
                            question: decodeString(question),
                            answers: quizContext.getShuffledAnswers().map((index) => answers[index]),
                            onFinishExploration,
                            onContinueExploration,
                        };
                        return <Question {...componentProps} />;
                    }
                }}
            </QuestionQuery>
        );
    }
}

export const QuizInterfaceContainer = withRouter(withQuizContext(QuizInterfaceContainerBase));
