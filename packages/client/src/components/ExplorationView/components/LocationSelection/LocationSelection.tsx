import { Card, IPanel, PanelStack } from "@blueprintjs/core";
import React, { Component } from "react";
import { ILocationPanelProps, LocationPanel, LocationType } from "./components/LocationPanel";
import styles from "./LocationSelection.module.scss";

const initialState = {
    currentPanelStack: [] as IPanel[],
};

// tslint:disable-next-line:no-empty-interface
export interface ILocationSelectionProps {}
type ILocationSelectionState = Readonly<typeof initialState>;

export class LocationSelection extends Component<ILocationSelectionProps, ILocationSelectionState> {
    public initialPanel: IPanel<ILocationPanelProps> = {
        component: LocationPanel,
        props: {
            locationType: LocationType.Region,
        },
        title: "Region",
    };

    public readonly state: ILocationSelectionState = {
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
