import { IPanelProps, ITreeNode, Tree } from "@blueprintjs/core";
import React, { Component } from "react";

// Fake Items
// tslint:disable:no-increment-decrement
let id = 0;

const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola"];
const regionItems: ITreeNode[] = regions.map(
    (region): ITreeNode => ({ id: id++, label: region, hasCaret: false, icon: "globe" })
);

const zones = ["Route 1", "Route 2", "Route 3"];
const zoneItems: ITreeNode[] = zones.map(
    (zone): ITreeNode => ({ id: id++, label: zone, hasCaret: false, icon: "map" })
);
// tslint:enable:no-increment-decrement

export enum ZoneType {
    Region,
    Zone,
}

export interface IZonePanelProps {
    zoneType: ZoneType;
}

export interface IZonePanelState {
    readonly treeNodes: ITreeNode[];
}

export class ZonePanel extends Component<IPanelProps & IZonePanelProps, IZonePanelState> {
    public readonly state: IZonePanelState = {
        treeNodes: [],
    };

    public componentDidMount() {
        this.setState({
            treeNodes: this.props.zoneType === ZoneType.Region ? regionItems : zoneItems,
        });
    }

    public componentWillUnmount() {
        this.deselectAllItems();
    }

    public render() {
        return <Tree contents={this.state.treeNodes} onNodeClick={this.onNodeClick} />;
    }

    private readonly onNodeClick = (nodeData: ITreeNode, _: number[], __: React.MouseEvent<HTMLElement>) => {
        if (this.props.zoneType === ZoneType.Region) {
            this.props.openPanel({
                component: ZonePanel,
                props: {
                    zoneType: ZoneType.Zone,
                },
                title: "Zone",
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
