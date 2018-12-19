import React from "react";
import { QuizDifficultySelection } from "../../components/Quiz/DifficultySelection";
import { QuizEncounter } from "../../components/Quiz/Encounter";
import { QuizInterface } from "../../components/Quiz/Interface";
import styles from "./Quiz.module.scss";

export function Quiz() {
    return (
        <div className={styles.row}>
            <div className={styles.column}>
                <QuizEncounter />
            </div>
            <div className={styles.column}>{Math.random() < 0.5 ? <QuizDifficultySelection /> : <QuizInterface />}</div>
        </div>
    );
}
