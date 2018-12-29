import { IButtonProps } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { AppbarComponent, IAppbarComponentProps } from "../components/AppbarComponent";

function AppbarContainerBase(props: RouteComponentProps) {
    const { history } = props;

    const leftButtons: IButtonProps[] = [
        {
            text: "Home",
            icon: "home",
            minimal: true,
            onClick: () => history.push("/"),
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
            onClick: () => history.push("/exploration"),
        },
        {
            text: "Trial",
            icon: "lightbulb",
            minimal: true,
            disabled: true,
        },
    ];
    const rightButtons: IButtonProps[] = [];

    const componentProps: IAppbarComponentProps = { leftButtons, rightButtons };

    return <AppbarComponent {...componentProps} />;
}

const AppbarContainer = withRouter(AppbarContainerBase);
export { AppbarContainer };
