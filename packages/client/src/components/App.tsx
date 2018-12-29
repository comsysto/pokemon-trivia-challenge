import { Classes, FocusStyleManager } from "@blueprintjs/core";
import classNames from "classnames";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import shortid from "shortid";
import { AppbarContainer } from "../app/common/Appbar/containers/AppbarContainer";
import { appRoutes } from "../Routes";
import Styles from "./App.module.scss";

export class App extends Component {
    public componentWillMount() {
        document.title = "Pokémon Trivia Challenge";

        FocusStyleManager.onlyShowFocusOnTabs();
    }

    public render() {
        return (
            <BrowserRouter>
                <div className={classNames(Classes.DARK, Styles.appContainer)}>
                    <AppbarContainer />
                    <Switch>
                        {appRoutes.map((routeProps) => (
                            <Route {...routeProps} key={shortid.generate()} />
                        ))}
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
