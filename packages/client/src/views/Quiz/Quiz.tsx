import React from "react";
import { DifficultySelection } from "../../components/Quiz/DifficultySelection";
import { Encounter } from "../../components/Quiz/Encounter";
import { Interface } from "../../components/Quiz/Interface";
import styles from "./Quiz.module.scss";

export function QuizView() {
    return (
        <div className={styles.row}>
            <div className={styles.column}>
                <Encounter />
            </div>
            <div className={styles.column}>{Math.random() < 0.5 ? <DifficultySelection /> : <Interface />}</div>
        </div>
    );
}
