import { FocusStyleManager } from "@blueprintjs/core";
import React, { Component } from "react";
import styles from "./App.module.scss";
import { Navbar } from "./Navbar";
import { QuestionCard } from "./QuestionCard";

export class App extends Component {
    public componentWillMount() {
        document.title = "Trivia Challenge";

        FocusStyleManager.onlyShowFocusOnTabs();
    }

    public render() {
        return (
            <div className={`bp3-dark ${styles.rootContainer}`}>
                <Navbar />
                <QuestionCard />
            </div>
        );
    }
}
