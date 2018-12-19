import React from "react";
import { QuizInterfaceActionButtons } from "./ActionButtons";
import { QuizInterfaceAnswers } from "./Answers";
import styles from "./Interface.module.scss";
import { QuizInterfaceQuestion } from "./Question";
import { QuizInterfaceResult } from "./Result";

export function QuizInterface() {
    return (
        <div className={styles.container}>
            <QuizInterfaceResult isCorrect={Math.random() < 0.5} />
            <QuizInterfaceQuestion />
            <QuizInterfaceAnswers />
            <QuizInterfaceActionButtons />
        </div>
    );
}
