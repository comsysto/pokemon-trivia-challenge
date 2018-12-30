import classNames from "classnames";
import React from "react";
import { ZoneDetailsContainer } from "../containers/ZoneDetailsContainer";
import { ZoneSelectionContainer } from "../containers/ZoneSelectionContainer";
import Styles from "../styles/ExploreView.module.scss";

export function ExploreView() {
    return (
        <div className={Styles.viewContainer}>
            <div className={classNames(Styles.column, Styles.sidebar)}>
                <ZoneSelectionContainer />
            </div>
            <div className={classNames(Styles.column, Styles.content)}>
                <ZoneDetailsContainer />
            </div>
        </div>
    );
}
