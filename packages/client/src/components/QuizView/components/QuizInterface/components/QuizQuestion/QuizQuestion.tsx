import { Callout, Card, Elevation, H4 } from "@blueprintjs/core";
import React from "react";
import styles from "./QuizQuestion.module.scss";

export function QuizQuestion() {
    return (
        <Card className={styles.question} elevation={Elevation.ZERO}>
            <Callout className={styles.callout}>
                <H4>Which of the following is NOT a word used to describe an earthquake?</H4>
            </Callout>
        </Card>
    );
}
