import { Button, Card, Elevation, H4, Intent } from "@blueprintjs/core";
import React from "react";
import Styles from "../styles/GameMode.module.scss";

export type GameModeProps = {
    title: string;
    description: string;
    buttonText: string;
    isDisabled?: boolean;

    onClick(): void;
};

export function GameMode(props: GameModeProps) {
    const { title, description, buttonText, isDisabled, onClick } = props;

    return (
        <Card className={Styles.itemCard} elevation={Elevation.ONE}>
            <H4>{title}</H4>
            <p>{description}</p>
            <div className={Styles.flexSpacer} />
            <Button intent={Intent.PRIMARY} disabled={isDisabled} onClick={onClick} large fill>
                {buttonText}
            </Button>
        </Card>
    );
}
