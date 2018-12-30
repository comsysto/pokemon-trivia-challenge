import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { GameMode, IGameModeProps } from "../components/GameMode";

export interface IGameModeContainerProps {
    title: string;
    description: string;
    buttonText: string;
    isDisabled?: boolean;
    url: string;
}

function GameModeContainerBase(props: IGameModeContainerProps & RouteComponentProps) {
    const { history, url, ...restProps } = props;

    const onClick = () => history.push(url);

    const componentProps: IGameModeProps = { ...restProps, onClick };
    return <GameMode {...componentProps} />;
}

export const GameModeContainer = withRouter(GameModeContainerBase);
