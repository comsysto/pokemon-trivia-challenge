import { Button, Card, Elevation, Intent } from "@blueprintjs/core";
import React from "react";
import styles from "./ActionButtons.module.scss";

export function QuizInterfaceActionButtons() {
    return (
        <Card className={styles.actions} elevation={Elevation.ZERO}>
            <div className={styles.actionsRow}>
                <div className={styles.fullSpacer} />
                <Button intent={Intent.NONE} large>
                    Finish Exploration
                </Button>
                <div className={styles.smallSpacer} />
                <Button intent={Intent.SUCCESS} large>
                    Continue
                </Button>
            </div>
        </Card>
    );
}
