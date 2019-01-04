import { IButtonProps } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Appbar, AppbarProps } from "../components/Appbar";
import * as Constants from "../constants";

type AppbarContainerBaseProps = RouteComponentProps;

function AppbarContainerBase(props: AppbarContainerBaseProps) {
    const { history } = props;

    const leftButtons: IButtonProps[] = [
        {
            text: "Home",
            icon: "home",
            minimal: true,
            onClick: () => {
                history.push(Constants.HomeRoute);
            },
        },
        {
            text: "Pokédex",
            icon: "list-detail-view",
            minimal: true,
            disabled: true,
        },
        {
            text: "Explore",
            icon: "map",
            minimal: true,
            onClick: () => {
                history.push(Constants.ExploreRoute);
            },
        },
        {
            text: "Trial",
            icon: "lightbulb",
            minimal: true,
            disabled: true,
        },
    ];
    const rightButtons: IButtonProps[] = [];

    const componentProps: AppbarProps = { leftButtons, rightButtons };
    return <Appbar {...componentProps} />;
}

export const AppbarContainer = withRouter(AppbarContainerBase);
