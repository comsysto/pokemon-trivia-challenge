import { Card, IPanel, PanelStack } from "@blueprintjs/core";
import React, { Component } from "react";
import { ZonePanel, IZonePanelProps, ZoneType } from "./ZonePanel";
import styles from "./ZoneSelection.module.scss";

export interface IZoneSelectionProps {}
export interface IZoneSelectionState {
    readonly currentPanelStack: IPanel[];
}

export class ZoneSelection extends Component<IZoneSelectionProps, IZoneSelectionState> {
    public initialPanel: IPanel<IZonePanelProps> = {
        component: ZonePanel,
        props: {
            zoneType: ZoneType.Region,
        },
        title: "Region",
    };

    public readonly state: IZoneSelectionState = {
        // Here be dragons...
        currentPanelStack: [(this.initialPanel as unknown) as IPanel],
    };

    public render() {
        return (
            <Card className={styles.sidebar}>
                <PanelStack
                    initialPanel={this.state.currentPanelStack[0]}
                    onOpen={this.addToPanelStack}
                    onClose={this.removeFromPanelStack}
                    className={styles.panelStack}
                />
            </Card>
        );
    }

    private addToPanelStack = (newPanel: IPanel) => {
        this.setState((state) => ({ currentPanelStack: [newPanel, ...state.currentPanelStack] }));
    };

    private removeFromPanelStack = (_: IPanel) => {
        this.setState((state) => ({ currentPanelStack: state.currentPanelStack.slice(1) }));
    };
}
