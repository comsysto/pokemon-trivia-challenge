import { NonIdealState } from "@blueprintjs/core";
import React from "react";
import { PokeBallType, QuizDifficultySelectionBallButton } from "./BallButton";
import styles from "./DifficultySelection.module.scss";

export function QuizDifficultySelection() {
    return (
        <div className={styles.container}>
            <NonIdealState
                icon="help"
                title="Select a Poké Ball"
                // tslint:disable-next-line:max-line-length
                description="Chose a Poké Ball for your next attempt at catching the encountered Pokémon. The better the Poké Ball the higher the chances are of catching a Pokémon. Keep in mind, that the question you'll have to answer for the attempt will be more difficult the better the Poké Ball!"
                action={
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <QuizDifficultySelectionBallButton pokeBallType={PokeBallType.Normal} />
                        <QuizDifficultySelectionBallButton pokeBallType={PokeBallType.Great} />
                        <QuizDifficultySelectionBallButton pokeBallType={PokeBallType.Ultra} />
                    </div>
                }
            />
        </div>
    );
}
