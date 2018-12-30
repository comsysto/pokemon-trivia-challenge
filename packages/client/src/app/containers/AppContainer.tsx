import { FocusStyleManager } from "@blueprintjs/core";
import React, { Component } from "react";
import { appRoutes } from "../../Routes";
import { App } from "../components/App";
import * as Constants from "../constants";

export class AppContainer extends Component {
    public componentWillMount() {
        document.title = Constants.AppTitle;
        FocusStyleManager.onlyShowFocusOnTabs();
    }

    public render() {
        return <App routes={appRoutes} />;
    }
}
