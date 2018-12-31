import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import { BrowserRouter, Route, RouteProps, Switch } from "react-router-dom";
import { AppbarContainer } from "../containers/AppbarContainer";
import Styles from "../styles/App.module.scss";

export type AppProps = {
    routes: RouteProps[];
};

export function App(props: AppProps) {
    const { routes } = props;

    return (
        <BrowserRouter>
            <div className={classNames(Classes.DARK, Styles.container)}>
                <AppbarContainer />
                <Switch>
                    {routes.map((routeProps) => (
                        <Route {...routeProps} key={routeProps.path as string} />
                    ))}
                </Switch>
            </div>
        </BrowserRouter>
    );
}
