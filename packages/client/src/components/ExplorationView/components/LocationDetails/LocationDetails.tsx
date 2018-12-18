import React from "react";
import { MissingSelection } from "./components/MissingSelection";
import { Overview } from "./components/Overview";
import styles from "./LocationDetails.module.scss";

export function LocationDetails() {
    return (
        <div className={styles.container}>
            {/* <MissingSelection /> */}
            <Overview />
        </div>
    );
}
