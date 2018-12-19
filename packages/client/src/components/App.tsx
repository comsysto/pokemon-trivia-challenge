import { FocusStyleManager } from "@blueprintjs/core";
import React, { Component } from "react";
import { Exploration } from "../views/Exploration";
import { GameMode } from "../views/GameMode";
import { Quiz } from "../views/Quiz";
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
                <Appbar />
                <GameMode />
                {/* <Exploration /> */}
                {/* <Quiz /> */}
            </div>
        );
    }
}
