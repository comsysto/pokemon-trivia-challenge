import { Button, Card, Elevation, Intent } from "@blueprintjs/core";
import React from "react";
import styles from "./Answers.module.scss";

export function Answers() {
    return (
        <Card className={styles.answers} elevation={Elevation.ZERO}>
            <div className={styles.answersRow}>
                <Button large className={styles.button}>
                    Foreshock
                </Button>
                <div className={styles.spacer} />
                <Button large intent={Intent.SUCCESS} className={styles.button}>
                    Drop-slide
                </Button>
            </div>
            <br />
            <div className={styles.answersRow}>
                <Button large className={styles.button} intent={Intent.DANGER}>
                    Strike-slip
                </Button>
                <div className={styles.spacer} />
                <Button large className={styles.button}>
                    Temblor
                </Button>
            </div>
        </Card>
    );
}
