import { Card, IPanel, NonIdealState, PanelStack, Spinner } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { RegionsQuery } from "../../../queries/RegionsQuery";
import { IZonePanelProps, ZonePanel, ZoneType } from "./ZonePanel";
import styles from "./ZoneSelection.module.scss";

function PureZoneSelection(props: RouteComponentProps) {
    const onPanelClose = () => {
        props.history.push("/exploration");
    };

    return (
        <Card className={styles.sidebar}>
            <RegionsQuery>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <NonIdealState icon={<Spinner />} />;
                    }

                    if (error) {
                        return (
                            <NonIdealState
                                icon="error"
                                description={`The GraphQL server encountered an error: ${error.message}`}
                            />
                        );
                    }

                    if (data === undefined) {
                        return <NonIdealState icon="error" description="The GraphQL server returned no result." />;
                    }

                    const initialPanel: IPanel<IZonePanelProps> = {
                        component: ZonePanel,
                        title: "Region",
                        props: {
                            zoneType: ZoneType.Region,
                            regionsQueryResponse: data,
                        },
                    };

                    return (
                        <PanelStack
                            initialPanel={(initialPanel as unknown) as IPanel}
                            className={styles.panelStack}
                            onClose={onPanelClose}
                        />
                    );
                }}
            </RegionsQuery>
        </Card>
    );
}

const ZoneSelection = withRouter(PureZoneSelection);
export { ZoneSelection };
