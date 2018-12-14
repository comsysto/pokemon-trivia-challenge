import React, { Component } from "react";
import logo from "./logo.svg";

import "./App.scss";

class App extends Component {
    public componentWillMount() {
        document.title = "Pokémon Trivia Challenge";
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
            </div>
        );
    }
}

export default App;
