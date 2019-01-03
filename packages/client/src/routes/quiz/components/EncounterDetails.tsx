import { HTMLTable, Intent, Tag } from "@blueprintjs/core";
import React from "react";

export enum ChanceToCatch {
    Low = "Low",
    Medium = "Medium",
    High = "High",
}

const chanceIntents: Record<ChanceToCatch, Intent> = {
    [ChanceToCatch.Low]: Intent.DANGER,
    [ChanceToCatch.Medium]: Intent.WARNING,
    [ChanceToCatch.High]: Intent.SUCCESS,
};

export type EncounterDetailsProps = {
    chanceToCatch: ChanceToCatch;
    isCollected?: boolean;
};

export function EncounterDetails(props: EncounterDetailsProps) {
    const collectionIntent = props.isCollected ? Intent.SUCCESS : Intent.DANGER;
    const collectionIcon = props.isCollected ? "tick" : "cross";
    const collectionText = props.isCollected ? "Collected" : "Not Collected";

    return (
        <HTMLTable>
            <tbody>
                <tr>
                    <td>Chance to Catch</td>
                    <td>
                        <Tag intent={chanceIntents[props.chanceToCatch]}>{props.chanceToCatch}</Tag>
                    </td>
                </tr>
                <tr>
                    <td>Collection Status</td>
                    <td>
                        <Tag intent={collectionIntent} icon={collectionIcon}>
                            {collectionText}
                        </Tag>
                    </td>
                </tr>
            </tbody>
        </HTMLTable>
    );
}
