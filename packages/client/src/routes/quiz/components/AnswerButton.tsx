import { Button, Intent } from "@blueprintjs/core";
import React from "react";
import { WithQuizContext, withQuizContext } from "../contexts/QuizContext";
import Styles from "../styles/AnswerButton.module.scss";

export type AnswerButtonProps = {
    text: string;
    isCorrect?: boolean;
};

type AnswerButtonBaseProps = AnswerButtonProps & WithQuizContext;

function AnswerButtonBase(props: AnswerButtonBaseProps) {
    const { isCorrect, text, quizContext } = props;
    const intent = !quizContext.hasFinished ? Intent.NONE : isCorrect ? Intent.SUCCESS : Intent.NONE;

    const onClick = () => {
        quizContext.finishQuiz(isCorrect);
    };

    return (
        <Button large className={Styles.answerButton} {...{ intent, onClick }} disabled={!!quizContext.hasFinished}>
            {text}
        </Button>
    );
}

export const AnswerButton = withQuizContext(AnswerButtonBase);
