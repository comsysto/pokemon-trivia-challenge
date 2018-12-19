import React from "react";
import { ExplorationZoneDetails } from "../../components/Exploration/ZoneDetails";
import { ExplorationZoneDetailsEmpty } from "../../components/Exploration/ZoneDetails/Empty";
import { ExplorationZoneSelection } from "../../components/Exploration/ZoneSelection";
import styles from "./Exploration.module.scss";

export function Exploration() {
    return (
        <div className={styles.row}>
            <div className={styles.column}>
                <ExplorationZoneSelection />
            </div>
            <div className={styles.column}>
                {Math.random() < 0.5 ? <ExplorationZoneDetailsEmpty /> : <ExplorationZoneDetails />}
            </div>
        </div>
    );
}
