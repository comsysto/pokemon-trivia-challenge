import { NonIdealState, Spinner } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { QuestionQuery } from "../../../api/graphql/QuestionQuery";
import * as Constants from "../../../app/constants";
import { QuizRouteParams } from "../../../Routes";
import { DifficultySelection } from "../components/DifficultySelection";
import { Answer, Question, QuestionProps } from "../components/Question";
import { WithQuizContext, withQuizContext } from "../cotexts/QuizContext";

function decodeString(text: string) {
    const el = document.createElement("textarea");
    // tslint:disable-next-line:no-inner-html
    el.innerHTML = text;
    return el.value;
}

type QuizInterfaceContainerProps = WithQuizContext & RouteComponentProps<QuizRouteParams>;

function QuizInterfaceContainerBase(props: QuizInterfaceContainerProps) {
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

    const onContinueExploration = () => {
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
                {({ loading, error, data }) => {
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
