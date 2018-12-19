import { Button, Intent, Tag, Tooltip } from "@blueprintjs/core";
import React from "react";
import styles from "./BallButton.module.scss";

export enum PokeBallType {
    Normal = "Normal",
    Great = "Great",
    Ultra = "Ultra",
}

export interface IQuizDifficultySelectionBallButtonProps {
    pokeBallType: PokeBallType;
}

const pokeBallNames: Record<PokeBallType, string> = {
    Normal: "Poké Ball",
    Great: "Great Ball",
    Ultra: "Ultra Ball",
};

const questionDifficulty: Record<PokeBallType, string> = {
    Normal: "Easy",
    Great: "Medium",
    Ultra: "Hard",
};

const difficultyIntent: Record<PokeBallType, Intent> = {
    Normal: Intent.SUCCESS,
    Great: Intent.WARNING,
    Ultra: Intent.DANGER,
};

export function QuizDifficultySelectionBallButton(props: IQuizDifficultySelectionBallButtonProps) {
    return (
        <Tooltip
            content={
                <>
                    Question Difficulty:{" "}
                    <Tag intent={difficultyIntent[props.pokeBallType]}>{questionDifficulty[props.pokeBallType]}</Tag>
                </>
            }
            position="bottom"
        >
            <Button large intent={Intent.PRIMARY} className={styles.button}>
                {pokeBallNames[props.pokeBallType]}
            </Button>
        </Tooltip>
    );
}
