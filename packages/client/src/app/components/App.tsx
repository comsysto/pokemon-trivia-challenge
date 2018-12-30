import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import { BrowserRouter, Route, RouteProps, Switch } from "react-router-dom";
import shortid from "shortid";
import { AppbarContainer } from "../containers/AppbarContainer";
import Styles from "../styles/App.module.scss";

export interface IAppProps {
    routes: RouteProps[];
}

export function App(props: IAppProps) {
    const { routes } = props;

    return (
        <BrowserRouter>
            <div className={classNames(Classes.DARK, Styles.appContainer)}>
                <AppbarContainer />
                <Switch>
                    {routes.map((routeProps) => (
                        <Route {...routeProps} key={shortid.generate()} />
                    ))}
                </Switch>
            </div>
        </BrowserRouter>
    );
}
