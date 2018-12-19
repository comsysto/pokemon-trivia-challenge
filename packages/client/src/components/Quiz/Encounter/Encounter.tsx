import { Card as BlueprintCard, NonIdealState } from "@blueprintjs/core";
import React from "react";
import { Card } from "./Card";
import styles from "./Encounter.module.scss";
import { ChanceToCatch, IStatsProps, Stats } from "./Stats";

function getRandomChance() {
    const index = Math.floor(Math.random() * 3) + 0;
    switch (index) {
        case 0:
            return ChanceToCatch.Low;
        case 1:
            return ChanceToCatch.Medium;
        case 2:
            return ChanceToCatch.High;
        default:
            return ChanceToCatch.High;
    }
}

export function Encounter() {
    const statsProps: IStatsProps = {
        isCollected: Math.random() < 0.5,
        chanceToCatch: getRandomChance(),
    };

    return (
        <BlueprintCard className={styles.sidebar}>
            <NonIdealState
                title="Name"
                icon={<Card />}
                description={<Stats {...statsProps} />}
            />
        </BlueprintCard>
    );
}
