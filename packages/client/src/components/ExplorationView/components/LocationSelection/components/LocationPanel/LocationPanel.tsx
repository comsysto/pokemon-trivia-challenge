import { IPanelProps, ITreeNode, Tree } from "@blueprintjs/core";
import React, { Component } from "react";

let id = 0;

const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola"];
const regionItems: ITreeNode[] = regions.map(
    (region) => ({ id: id++, label: region, hasCaret: false, icon: "globe" } as ITreeNode)
);

const locations = ["Route 1", "Route 2", "Route 3"];
const locationItems: ITreeNode[] = locations.map(
    (location) => ({ id: id++, label: location, hasCaret: false, icon: "map" } as ITreeNode)
);

export enum LocationType {
    Region,
    Location,
}

export interface ILocationPanelProps {
    locationType: LocationType;
}

export interface ILocationPanelState {
    treeNodes: ITreeNode[];
}

export class LocationPanel extends Component<ILocationPanelProps & IPanelProps, ILocationPanelState> {
    public readonly state: ILocationPanelState = {
        treeNodes: [],
    };

    public componentDidMount() {
        this.setState({
            treeNodes: this.props.locationType === LocationType.Region ? regionItems : locationItems,
        });
    }

    public componentWillUnmount() {
        this.deselectAllItems();
    }

    public render() {
        return <Tree contents={this.state.treeNodes} onNodeClick={this.onNodeClick} />;
    }

    private onNodeClick = (nodeData: ITreeNode, _: number[], __: React.MouseEvent<HTMLElement>) => {
        if (this.props.locationType === LocationType.Region) {
            this.props.openPanel({
                component: LocationPanel,
                props: {
                    locationType: LocationType.Location,
                },
                title: "Location",
            });
        } else {
            this.deselectAllItems();
            nodeData.isSelected = true;
            this.setState((state) => state);
        }
    };

    private deselectAllItems() {
        this.forEachNode(this.state.treeNodes, (node) => (node.isSelected = false));
    }

    private forEachNode(nodes: ITreeNode[], callback: (node: ITreeNode) => void) {
        if (nodes === null) {
            return;
        }

        for (const node of nodes) {
            callback(node);
            if (node.childNodes !== undefined) {
                this.forEachNode(node.childNodes, callback);
            }
        }
    }
}
