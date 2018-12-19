import React from "react";
import { ActionButton } from "./ActionButton";
import { Collection } from "./Collection";
import { Header } from "./Header";
import { Progress } from "./Progress";
import styles from "./ZoneDetails.module.scss";

export function ZoneDetails() {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <Header />
                <div className={styles.spacer} />
            </div>
            <div className={styles.row}>
                <div className={styles.progress}>
                    <Progress />
                </div>
                <div className={styles.spacer} />
            </div>
            <div className={styles.row}>
                <ActionButton />
            </div>
            <div className={styles.row}>
                <Collection isCollection />
            </div>
            <div className={styles.row}>
                <Collection isCollection={false} />
            </div>
        </div>
    );
}
