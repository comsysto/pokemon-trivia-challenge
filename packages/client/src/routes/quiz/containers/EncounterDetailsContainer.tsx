import React from "react";
import { ChanceToCatch, EncounterDetails } from "../components/EncounterDetails";
import { WithQuizContext, withQuizContext } from "../contexts/QuizContext";

type EncounterDetailsContainerBaseProps = WithQuizContext;

function EncounterDetailsContainerBase(props: EncounterDetailsContainerBaseProps) {
    const { quizContext } = props;

    if (quizContext.encounterData === undefined) {
        // The way this container is intended to be used makes sure that encounterData is never undefined inside of it
        // for now ...
        throw new Error("quizContext.encounterData is undefined in EncounterDetailsContainer when it should not be");
    } else {
        const captureRate = quizContext.encounterData.captureRate;

        const chanceToCatch: ChanceToCatch =
            captureRate > 170 ? ChanceToCatch.High : captureRate > 85 ? ChanceToCatch.Medium : ChanceToCatch.Low;

        const serializedData = JSON.parse(localStorage.getItem("caughtPokemon") || "[]") as string[];
        const isCollected = serializedData.includes(quizContext.encounterData.name);

        return <EncounterDetails {...{ chanceToCatch, isCollected }} />;
    }
}

export const EncounterDetailsContainer = withQuizContext(EncounterDetailsContainerBase);
