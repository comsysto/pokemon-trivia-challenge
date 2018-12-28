import { Button, Card, Elevation, H4, Intent } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styles from "./GameMode.module.scss";

export interface IGameModeProps {
    title: string;
    description: string;
    actionText: string;
    url: string;
    isDisabled?: boolean;
}

function PureGameMode(props: IGameModeProps & RouteComponentProps) {
    const onClick = () => {
        props.history.push(props.url);
    };

    return (
        <Card className={styles.card} elevation={Elevation.ONE}>
            <H4>{props.title}</H4>
            <p>{props.description}</p>
            <div className={styles.spacer} />
            <Button intent={Intent.PRIMARY} disabled={props.isDisabled} onClick={onClick} large fill>
                {props.actionText}
            </Button>
        </Card>
    );
}

const GameMode = withRouter(PureGameMode);

export { GameMode };
