import { FocusStyleManager } from "@blueprintjs/core";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ExplorationView } from "../views/Exploration";
import { GameModeView } from "../views/GameMode";
import { QuizView } from "../views/Quiz";
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
                            <Route exact path="/" component={GameModeView} />
                            <Route path="/exploration/:regionName?/:zoneName?" component={ExplorationView} />
                            <Route path="/quiz" component={QuizView} />
                        </Switch>
                    </>
                </BrowserRouter>
            </div>
        );
    }
}
