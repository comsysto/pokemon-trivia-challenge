import { Button, Card as BlueprintCard, Elevation, H4, Intent } from "@blueprintjs/core";
import React from "react";
import styles from "./Card.module.scss";

export interface ICardProps {
    title: string;
    description: string;
    actionText: string;
}

export function Card(props: ICardProps) {
    return (
        <BlueprintCard elevation={Elevation.FOUR} className={styles.card}>
            <H4>{props.title}</H4>
            <p>{props.description}</p>
            <div style={{ flex: 1 }} />
            <Button large fill intent={Intent.PRIMARY}>
                {props.actionText}
            </Button>
        </BlueprintCard>
    );
}
