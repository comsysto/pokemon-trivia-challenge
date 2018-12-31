import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { GameMode, GameModeProps } from "../components/GameMode";

export type GameModeContainerProps = {
    title: string;
    description: string;
    buttonText: string;
    isDisabled?: boolean;
    url: string;
};

type GameModeContainerBaseProps = GameModeContainerProps & RouteComponentProps;

function GameModeContainerBase(props: GameModeContainerBaseProps) {
    const { history, url, ...restProps } = props;

    const onClick = () => history.push(url);

    const componentProps: GameModeProps = { ...restProps, onClick };
    return <GameMode {...componentProps} />;
}

export const GameModeContainer = withRouter(GameModeContainerBase);
