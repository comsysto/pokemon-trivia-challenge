import { Card, IPanel, PanelStack } from "@blueprintjs/core";
import React, { Component } from "react";
import { RegionsQuery } from "../../../queries/RegionsQuery";
import { IZonePanelProps, ZonePanel, ZoneType } from "./ZonePanel";
import styles from "./ZoneSelection.module.scss";

export class ZoneSelection extends Component {
    public render() {
        return (
            <Card className={styles.sidebar}>
                <RegionsQuery>
                    {({ loading, error, data }) => {
                        if (loading || error) {
                            return <></>;
                        }

                        return (
                            <PanelStack
                                initialPanel={
                                    (({
                                        component: ZonePanel,
                                        title: "Region",
                                        props: {
                                            zoneType: ZoneType.Region,
                                            regionsQueryResponse: data,
                                        },
                                    } as IPanel<IZonePanelProps>) as unknown) as IPanel
                                }
                                className={styles.panelStack}
                            />
                        );
                    }}
                </RegionsQuery>
            </Card>
        );
    }
}
