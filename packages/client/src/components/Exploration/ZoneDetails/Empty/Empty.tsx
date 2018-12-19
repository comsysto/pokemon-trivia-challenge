import { NonIdealState } from "@blueprintjs/core";
import React from "react";
import styles from "./Empty.module.scss";

export function ExplorationZoneDetailsEmpty() {
    return (
        <div className={styles.container}>
            <NonIdealState
                title="Select a location to show more details"
                // tslint:disable-next-line:max-line-length
                description="Once you select a location, you will see further details about it. This includes an overview of all Pokémon that you already caught in the zone and those who are still missing in your Pokédex."
                icon="map"
            />
        </div>
    );
}
