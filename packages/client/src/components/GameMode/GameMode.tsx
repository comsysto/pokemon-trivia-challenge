import { Button, Card, Elevation, H4, Intent } from "@blueprintjs/core";
import React from "react";
import styles from "./GameMode.module.scss";

export interface IGameModeProps {
    title: string;
    description: string;
    actionText: string;
}

export function GameMode(props: IGameModeProps) {
    return (
        <Card className={styles.card} elevation={Elevation.ONE}>
            <H4>{props.title}</H4>
            <p>{props.description}</p>
            <div className={styles.spacer} />
            <Button intent={Intent.PRIMARY} large fill>
                {props.actionText}
            </Button>
        </Card>
    );
}
