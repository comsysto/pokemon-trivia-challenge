import { Card, IPanel, NonIdealState, PanelStack, Spinner } from "@blueprintjs/core";
import { ApolloError } from "apollo-client";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { RegionsQuery, RegionsQueryResponse } from "../../../queries/RegionsQuery";
import { IZonePanelProps, ZonePanel, ZoneType } from "./ZonePanel";
import styles from "./ZoneSelection.module.scss";

function LoadingSpinner() {
    return <NonIdealState icon={<Spinner />} />;
}

function ServerErrorIndicator(props: ApolloError) {
    return <NonIdealState icon="error" description={`The GraphQL server encountered an error: ${props.message}`} />;
}

function UnexpectedErrorIndicator() {
    return <NonIdealState icon="error" description="The GraphQL server returned no result." />;
}

function ZonePanelStack(props: RegionsQueryResponse & RouteComponentProps) {
    const { history, regions } = props;

    const onPanelClose = () => history.push("/exploration");

    const initialPanel: IPanel<IZonePanelProps> = {
        component: ZonePanel,
        title: "Region",
        props: {
            zoneType: ZoneType.Region,
            regionsQueryResponse: { regions },
        },
    };

    return (
        <PanelStack
            initialPanel={(initialPanel as unknown) as IPanel}
            className={styles.panelStack}
            onClose={onPanelClose}
        />
    );
}

function PureZoneSelection(props: RouteComponentProps) {
    return (
        <Card className={styles.sidebar}>
            <RegionsQuery>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <LoadingSpinner />;
                    }

                    if (error) {
                        return <ServerErrorIndicator {...error} />;
                    }

                    if (data === undefined) {
                        return <UnexpectedErrorIndicator />;
                    }

                    return <ZonePanelStack {...props} {...data} />;
                }}
            </RegionsQuery>
        </Card>
    );
}

const ZoneSelection = withRouter(PureZoneSelection);
export { ZoneSelection };
