import { Button, Callout, Card, Elevation, H4, Intent } from "@blueprintjs/core";
import React from "react";
import { WithQuizContext, withQuizContext } from "../cotexts/QuizContext";
import Styles from "../styles/Question.module.scss";
import { AnswerButton, AnswerButtonProps } from "./AnswerButton";

export type Answer = AnswerButtonProps;

export type QuestionProps = {
    question: string;
    answers: Answer[];

    onFinishExploration(): void;
    onContinueExploration(): void;
};

type QuestionBaseProps = QuestionProps & WithQuizContext;

function QuestionBase(props: QuestionBaseProps) {
    const {
        question,
        answers,
        quizContext: { hasFinished, isCorrect },
        onFinishExploration,
        onContinueExploration,
    } = props;

    const feedbackIntent = isCorrect ? Intent.SUCCESS : Intent.DANGER;

    return (
        <div className={Styles.container}>
            {hasFinished && (
                <Callout intent={feedbackIntent} className={Styles.callout}>
                    <H4>Your answer is {!isCorrect ? "in" : ""}correct!</H4>
                    <p>
                        Click <em>Continue</em> to select your next destination zone, otherwise click{" "}
                        <em>Finish Exploration</em> to conclude your session and return to the home screen.
                    </p>
                </Callout>
            )}

            <Card className={Styles.question} elevation={Elevation.ZERO}>
                <Callout className={Styles.transparentCallout}>
                    <H4>{question}</H4>
                </Callout>
            </Card>

            <Card className={Styles.answers} elevation={Elevation.ZERO}>
                <div className={Styles.answersRow}>
                    <AnswerButton {...answers[0]} />
                    <div className={Styles.smallSpacer} />
                    <AnswerButton {...answers[1]} />
                </div>
                <br />
                <div className={Styles.answersRow}>
                    <AnswerButton {...answers[2]} />
                    <div className={Styles.smallSpacer} />
                    <AnswerButton {...answers[3]} />
                </div>
            </Card>

            {hasFinished && (
                <Card className={Styles.actions} elevation={Elevation.ZERO}>
                    <div className={Styles.actionsRow}>
                        <div className={Styles.fullSpacer} />
                        <Button onClick={onFinishExploration} intent={Intent.NONE} large>
                            Finish Exploration
                        </Button>
                        <div className={Styles.smallSpacer} />
                        <Button onClick={onContinueExploration} intent={Intent.SUCCESS} large>
                            Continue
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}

export const Question = withQuizContext(QuestionBase);
