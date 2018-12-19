import React from "react";
import { ActionButtons } from "./ActionButtons";
import { Answers } from "./Answers";
import styles from "./Interface.module.scss";
import { Question } from "./Question";
import { Result } from "./Result";

export function Interface() {
    return (
        <div className={styles.container}>
            <Result isCorrect={Math.random() < 0.5} />
            <Question />
            <Answers />
            <ActionButtons />
        </div>
    );
}
