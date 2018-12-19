import { Card, Elevation, Intent, Tag } from "@blueprintjs/core";
import React from "react";
import styles from "./PokemonCard.module.scss";

export interface IPokemonCardProps {
    isCollected?: boolean;
}

export function PokemonCard(props: IPokemonCardProps) {
    const id = Math.floor(Math.random() * 650) + 0;

    return (
        <Card className={styles.card} elevation={Elevation.TWO}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
            <Tag intent={props.isCollected || false ? Intent.SUCCESS : Intent.DANGER}>Name</Tag>
        </Card>
    );
}
