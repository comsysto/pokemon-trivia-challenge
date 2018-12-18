import React from "react";
import { DifficultySelection } from "./components/DifficultySelection";
import { EncounterDetails } from "./components/EncounterDetails";
import { QuizInterface } from "./components/QuizInterface";
import styles from "./QuizView.module.scss";

export function QuizView() {
    return (
        <div className={styles.row}>
            <div className={styles.column}>
                <EncounterDetails />
            </div>
            <div className={styles.column}>
                {/* <DifficultySelection /> */}
                <QuizInterface />
            </div>
        </div>
    );
}
