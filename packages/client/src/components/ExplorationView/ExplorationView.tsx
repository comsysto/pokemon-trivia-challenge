import React from "react";
import { LocationDetails } from "./components/LocationDetails";
import { LocationSelection } from "./components/LocationSelection";
import styles from "./ExplorationView.module.scss";

export function ExplorationView() {
    return (
        <div className={styles.row}>
            <div className={styles.column}>
                <LocationSelection />
            </div>
            <div className={styles.column}>
                <LocationDetails />
            </div>
        </div>
    );
}
