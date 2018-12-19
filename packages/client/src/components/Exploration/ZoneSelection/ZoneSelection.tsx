import { Card, IPanel, PanelStack } from "@blueprintjs/core";
import React, { Component } from "react";
import { ExplorationZoneSelectionPanel, IExplorationZoneSelectionPanelProps, ZoneType } from "./Panel";
import styles from "./ZoneSelection.module.scss";

export interface IExplorationZoneSelectionProps {}
export interface IExplorationZoneSelectionState {
    readonly currentPanelStack: IPanel[];
}

export class ExplorationZoneSelection extends Component<
    IExplorationZoneSelectionProps,
    IExplorationZoneSelectionState
> {
    public initialPanel: IPanel<IExplorationZoneSelectionPanelProps> = {
        component: ExplorationZoneSelectionPanel,
        props: {
            zoneType: ZoneType.Region,
        },
        title: "Region",
    };

    public readonly state: IExplorationZoneSelectionState = {
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
