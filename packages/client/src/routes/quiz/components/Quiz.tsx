import classNames from "classnames";
import React from "react";
import { EncounterContainer } from "../containers/EncounterContainer";
import { QuizInterfaceContainer } from "../containers/QuizInterfaceContainer";
import Styles from "../styles/Quiz.module.scss";

export function Quiz() {
    return (
        <div className={Styles.container}>
            <div className={classNames(Styles.column, Styles.sidebar)}>
                <EncounterContainer />
            </div>
            <div className={classNames(Styles.column, Styles.content)}>
                <QuizInterfaceContainer />
            </div>
        </div>
    );
}
