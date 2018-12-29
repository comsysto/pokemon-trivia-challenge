import { IPanelProps, ITreeNode, Tree } from "@blueprintjs/core";
import React, { Component } from "react";
import { RegionsQueryResponse } from "../../../../queries/RegionsQuery";

export enum ZoneType {
    Region,
    Zone,
}

export interface IZonePanelProps {
    zoneType: ZoneType;
    regionsQueryResponse: RegionsQueryResponse;
    regionId?: string;
}

export interface IZonePanelState {
    readonly treeNodes: ITreeNode[];
}

export class ZonePanel extends Component<IPanelProps & IZonePanelProps, IZonePanelState> {
    public readonly state: IZonePanelState = {
        treeNodes: [],
    };

    public componentDidMount() {
        if (this.props.zoneType === ZoneType.Region) {
            const regionItems = this.props.regionsQueryResponse.regions.map(
                ({ id, names }): ITreeNode => ({ id, label: names[0].name, hasCaret: false, icon: "globe" })
            );
            this.setState({ treeNodes: regionItems });
        } else {
            const region = this.props.regionsQueryResponse.regions.filter(({ id }) => id === this.props.regionId)[0];
            const zoneItems = region.locations
                .sort((a, b) => a.names[0].name.localeCompare(b.names[0].name))
                .map(({ id, names }): ITreeNode => ({ id, label: names[0].name, hasCaret: false, icon: "map" }));
            this.setState({ treeNodes: zoneItems });
        }
    }

    public componentWillUnmount() {
        this.deselectAllItems();
    }

    public render() {
        return <Tree contents={this.state.treeNodes} onNodeClick={this.onNodeClick} />;
    }

    private readonly onNodeClick = (nodeData: ITreeNode) => {
        if (this.props.zoneType === ZoneType.Region) {
            this.props.openPanel({
                component: ZonePanel,
                props: {
                    zoneType: ZoneType.Zone,
                    regionsQueryResponse: this.props.regionsQueryResponse,
                    regionId: nodeData.id as string,
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
