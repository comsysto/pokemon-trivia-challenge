import { FocusStyleManager } from "@blueprintjs/core";
import React, { Component } from "react";
import styles from "./App.module.scss";
import { ExplorationView } from "./ExplorationView";
import { GameModeView } from "./GameModeView";
import { Navbar } from "./Navbar";
import { QuestionCard } from "./QuestionCard";
import { QuizView } from "./QuizView";

export class App extends Component {
    public componentWillMount() {
        document.title = "Pokémon Trivia Challenge";

        FocusStyleManager.onlyShowFocusOnTabs();
    }

    public render() {
        return (
            <div className={`bp3-dark ${styles.rootContainer}`}>
                <Navbar />
                {/* <GameModeView /> */}
                <ExplorationView />
                {/* <QuizView /> */}
            </div>
        );
    }
}
