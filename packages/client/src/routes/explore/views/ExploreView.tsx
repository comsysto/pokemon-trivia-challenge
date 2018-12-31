import classNames from "classnames";
import React from "react";
import { ZoneDetailsContainer } from "../containers/ZoneDetailsContainer";
import { ZoneSelectionContainer } from "../containers/ZoneSelectionContainer";
import { ExploreContextProvider } from "../contexts/ExploreContext";
import Styles from "../styles/ExploreView.module.scss";

export function ExploreView() {
    return (
        <ExploreContextProvider>
            <div className={Styles.container}>
                <div className={classNames(Styles.column, Styles.sidebar)}>
                    <ZoneSelectionContainer />
                </div>
                <div className={classNames(Styles.column, Styles.content)}>
                    <ZoneDetailsContainer />
                </div>
            </div>
        </ExploreContextProvider>
    );
}
