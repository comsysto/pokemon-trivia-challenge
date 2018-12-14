import { Button, Callout, Card, Elevation, H4, Intent } from "@blueprintjs/core";
import React from "react";
import styles from "./QuestionCard.module.scss";

export function QuestionCard() {
    return (
        <div className={styles.container}>
            <Card className={styles.child} elevation={Elevation.FOUR}>
                <Callout className={styles.question}>
                    <H4>Which of the following is NOT a word used to describe an earthquake?</H4>
                </Callout>
            </Card>
            <Card className={styles.child} elevation={Elevation.FOUR}>
                <div style={{ display: "flex" }}>
                    <Button large style={{ flex: 1 }}>
                        Foreshock
                    </Button>
                    <div style={{ width: 16 }} />
                    <Button large intent={Intent.SUCCESS} style={{ flex: 1 }}>
                        Drop-slide
                    </Button>
                </div>
                <br />
                <div style={{ display: "flex" }}>
                    <Button large style={{ flex: 1 }} intent={Intent.DANGER}>
                        Strike-slip
                    </Button>
                    <div style={{ width: 16 }} />
                    <Button large style={{ flex: 1 }}>
                        Temblor
                    </Button>
                </div>
            </Card>
        </div>
    );
}
