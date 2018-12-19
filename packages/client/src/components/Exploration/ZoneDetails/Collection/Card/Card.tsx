import { Card, Elevation, Intent, Tag } from "@blueprintjs/core";
import React from "react";
import styles from "./Card.module.scss";

export interface IExplorationZoneDetailsCollectionCardProps {
    isCollected?: boolean;
}

export function ExplorationZoneDetailsCollectionCard(props: IExplorationZoneDetailsCollectionCardProps) {
    const id = Math.floor(Math.random() * 650) + 0;

    return (
        <Card className={styles.card} elevation={Elevation.TWO}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
            <Tag intent={props.isCollected || false ? Intent.SUCCESS : Intent.DANGER}>Name</Tag>
        </Card>
    );
}
