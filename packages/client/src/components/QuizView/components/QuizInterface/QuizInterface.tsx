import React from "react";
import { QuizActions } from "./components/QuizActions";
import { QuizAnswers } from "./components/QuizAnswers";
import { QuizQuestion } from "./components/QuizQuestion";
import { QuizResult } from "./components/QuizResult";
import styles from "./QuizInterface.module.scss";

export function QuizInterface() {
    return (
        <div className={styles.container}>
            <QuizResult isCorrect={Math.random() < 0.5} />
            <QuizQuestion />
            <QuizAnswers />
            <QuizActions />
        </div>
    );
}
