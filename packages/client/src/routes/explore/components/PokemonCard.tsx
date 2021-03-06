import { Card, Elevation, Intent, Tag } from "@blueprintjs/core";
import React from "react";
import Styles from "../styles/PokemonCard.module.scss";

export type PokemonCardProps = {
    sprite: string;
    name: string;
    isCollected?: boolean;
};

export function PokemonCard(props: PokemonCardProps) {
    const intent = props.isCollected ? Intent.SUCCESS : Intent.DANGER;

    return (
        <Card className={Styles.card} elevation={Elevation.TWO}>
            <img src={props.sprite} />
            <Tag intent={intent}>{props.name}</Tag>
        </Card>
    );
}
