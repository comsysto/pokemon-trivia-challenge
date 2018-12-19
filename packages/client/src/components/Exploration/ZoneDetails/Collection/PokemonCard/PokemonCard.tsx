import { Card, Elevation, Intent, Tag } from "@blueprintjs/core";
import React from "react";
import styles from "./PokemonCard.module.scss";

export interface IPokemonCardProps {
    isCollected?: boolean;
}

export function PokemonCard(props: IPokemonCardProps) {
    const id = Math.floor(Math.random() * 650) + 0;
    const intent = props.isCollected ? Intent.SUCCESS : Intent.DANGER;

    return (
        <Card className={styles.card} elevation={Elevation.TWO}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
            <Tag intent={intent}>Name</Tag>
        </Card>
    );
}
