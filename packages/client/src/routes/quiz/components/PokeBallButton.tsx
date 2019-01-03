import { Button, Intent, Tag, Tooltip } from "@blueprintjs/core";
import React from "react";
import { withQuizContext, WithQuizContext } from "../cotexts/QuizContext";
import Styles from "../styles/PokeBallButton.module.scss";

export enum PokeBallType {
    Normal = "Normal",
    Great = "Great",
    Ultra = "Ultra",
}

const pokeBallNames: Record<PokeBallType, string> = {
    [PokeBallType.Normal]: "Poké Ball",
    [PokeBallType.Great]: "Great Ball",
    [PokeBallType.Ultra]: "Ultra Ball",
};

const questionDifficulty: Record<PokeBallType, string> = {
    Normal: "Easy",
    Great: "Medium",
    Ultra: "Hard",
};

const difficultyIntent: Record<PokeBallType, Intent> = {
    [PokeBallType.Normal]: Intent.SUCCESS,
    [PokeBallType.Great]: Intent.WARNING,
    [PokeBallType.Ultra]: Intent.DANGER,
};

export type PokeBallButtonProps = {
    pokeBallType: PokeBallType;
};

type PokeBallButtonBaseProps = PokeBallButtonProps & WithQuizContext;

function PokeBallButtonBase(props: PokeBallButtonBaseProps) {
    const { pokeBallType } = props;

    const onClick = () => {
        const { quizContext } = props;

        quizContext.setDifficulty(questionDifficulty[pokeBallType]);
    };

    return (
        <Tooltip
            content={
                <>
                    Question Difficulty:{" "}
                    <Tag intent={difficultyIntent[pokeBallType]}>{questionDifficulty[pokeBallType]}</Tag>
                </>
            }
            position="bottom"
        >
            <Button large intent={Intent.PRIMARY} className={Styles.pokeBallButton} {...{ onClick }}>
                {pokeBallNames[pokeBallType]}
            </Button>
        </Tooltip>
    );
}

export const PokeBallButton = withQuizContext(PokeBallButtonBase);
