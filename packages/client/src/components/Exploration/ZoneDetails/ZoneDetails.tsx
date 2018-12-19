import React from "react";
import { ExplorationZoneDetailsActionButton } from "./ActionButton";
import { ExplorationZoneDetailsCollection } from "./Collection";
import { ExplorationZoneDetailsHeader } from "./Header";
import { ExplorationZoneDetailsProgress } from "./Progress";
import styles from "./ZoneDetails.module.scss";

export function ExplorationZoneDetails() {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <ExplorationZoneDetailsHeader />
                <div className={styles.spacer} />
            </div>
            <div className={styles.row}>
                <div className={styles.progress}>
                    <ExplorationZoneDetailsProgress />
                </div>
                <div className={styles.spacer} />
            </div>
            <div className={styles.row}>
                <ExplorationZoneDetailsActionButton />
            </div>
            <div className={styles.row}>
                <ExplorationZoneDetailsCollection isCollection />
            </div>
            <div className={styles.row}>
                <ExplorationZoneDetailsCollection isCollection={false} />
            </div>
        </div>
    );
}
