import { FocusStyleManager } from "@blueprintjs/core";
import React, { Component } from "react";
import * as Constants from "../../common/constants";
import { appRoutes } from "../../Routes";
import { App } from "../components/App";

export class AppContainer extends Component {
    public componentWillMount() {
        document.title = Constants.AppTitle;
        FocusStyleManager.onlyShowFocusOnTabs();
    }

    public render() {
        return <App routes={appRoutes} />;
    }
}
