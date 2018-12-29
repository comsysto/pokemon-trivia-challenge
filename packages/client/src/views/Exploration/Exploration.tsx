import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { ZoneDetails } from "../../components/Exploration/ZoneDetails";
import { Empty } from "../../components/Exploration/ZoneDetails/Empty";
import { ZoneSelection } from "../../components/Exploration/ZoneSelection";
import { ExplorationRouteParams } from "../../Routes";
import styles from "./Exploration.module.scss";

function PureExplorationView(props: RouteComponentProps<ExplorationRouteParams>) {
    const {
        match: {
            params: { zoneName },
        },
    } = props;

    return (
        <div className={styles.row}>
            <div className={styles.column}>
                <ZoneSelection />
            </div>
            <div className={styles.column}>
                {zoneName === undefined ? <Empty /> : <ZoneDetails zoneName={zoneName} />}
            </div>
        </div>
    );
}

const ExplorationView = withRouter(PureExplorationView);
export { ExplorationView };
