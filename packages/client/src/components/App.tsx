import { FocusStyleManager } from "@blueprintjs/core";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { appRoutes } from "../Routes";
import styles from "./App.module.scss";
import { Appbar } from "./Appbar";

export class App extends Component {
    public componentWillMount() {
        document.title = "Pokémon Trivia Challenge";

        FocusStyleManager.onlyShowFocusOnTabs();
    }

    public render() {
        return (
            <div className={`bp3-dark ${styles.container}`}>
                <BrowserRouter>
                    <>
                        <Appbar />
                        <Switch>
                            {appRoutes.map((routeProps) => (
                                <Route {...routeProps} key={routeProps.path as string} />
                            ))}
                        </Switch>
                    </>
                </BrowserRouter>
            </div>
        );
    }
}
