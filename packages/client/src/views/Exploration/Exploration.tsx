import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { ZoneDetails } from "../../components/Exploration/ZoneDetails";
import { Empty } from "../../components/Exploration/ZoneDetails/Empty";
import { ZoneSelection } from "../../components/Exploration/ZoneSelection";
import styles from "./Exploration.module.scss";

type RouteParams = {
    regionName?: string;
    zoneName?: string;
};

function PureExplorationView(props: RouteComponentProps<RouteParams>) {
    return (
        <div className={styles.row}>
            <div className={styles.column}>
                <ZoneSelection />
            </div>
            <div className={styles.column}>
                {props.match.params.zoneName === undefined ? <Empty /> : <ZoneDetails />}
            </div>
        </div>
    );
}

const ExplorationView = withRouter(PureExplorationView);
export { ExplorationView };
