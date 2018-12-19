import React from "react";
import { ZoneDetails } from "../../components/Exploration/ZoneDetails";
import { Empty } from "../../components/Exploration/ZoneDetails/Empty";
import { ZoneSelection } from "../../components/Exploration/ZoneSelection";
import styles from "./Exploration.module.scss";

export function ExplorationView() {
    return (
        <div className={styles.row}>
            <div className={styles.column}>
                <ZoneSelection />
            </div>
            <div className={styles.column}>
                {Math.random() < 0.5 ? <Empty /> : <ZoneDetails />}
            </div>
        </div>
    );
}
