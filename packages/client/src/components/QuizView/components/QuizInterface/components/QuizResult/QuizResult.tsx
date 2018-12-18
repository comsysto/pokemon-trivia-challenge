import { Callout, H4, Intent } from "@blueprintjs/core";
import React from "react";
import styles from "./QuizResult.module.scss";

export interface IQuizResultProps {
    isCorrect?: boolean;
}

export function QuizResult(props: IQuizResultProps) {
    return (
        <Callout intent={props.isCorrect ? Intent.SUCCESS : Intent.DANGER} className={styles.callout}>
            <H4>{props.isCorrect ? "Your answer is correct!" : "Your answer is incorrect!"}</H4>
            <p>
                Click <em>Continue</em> to encounter the next Pokémon in the current zone, otherwise click{" "}
                <em>Finish Exploration</em> to conclude your session and return to the home screen.
            </p>
        </Callout>
    );
}
