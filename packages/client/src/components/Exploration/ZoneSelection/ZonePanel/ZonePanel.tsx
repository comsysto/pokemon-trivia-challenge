import { IPanelProps, ITreeNode, Tree } from "@blueprintjs/core";
import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { RegionsQueryResponse } from "../../../../queries/RegionsQuery";
import { ExplorationRouteParams } from "../../../../Routes";

export enum ZoneType {
    Region,
    Zone,
}

type TreeNodeType = ITreeNode<{ id: string; name: string }>;

export interface IZonePanelProps {
    zoneType: ZoneType;
    regionsQueryResponse: RegionsQueryResponse;
}

export interface IZonePanelState {
    readonly treeNodes: TreeNodeType[];
}

class PureZonePanel extends Component<
    IPanelProps & IZonePanelProps & RouteComponentProps<ExplorationRouteParams>,
    IZonePanelState
> {
    public readonly state: IZonePanelState = {
        treeNodes: [],
    };

    public componentDidMount() {
        const { regionName, zoneName } = this.props.match.params;

        if (this.props.zoneType === ZoneType.Region) {
            const regionItems = this.props.regionsQueryResponse.regions.map(
                ({ id, name, names }): TreeNodeType => ({
                    id,
                    label: names[0].name,
                    hasCaret: false,
                    icon: "globe",
                    nodeData: {
                        id,
                        name,
                    },
                })
            );
            this.setState({ treeNodes: regionItems });

            if (regionName !== undefined) {
                this.openZonePanel();
            }
        } else {
            const region = this.props.regionsQueryResponse.regions.filter(({ name }) => name === regionName)[0];
            const zoneItems = region.locations
                .sort((a, b) => a.names[0].name.localeCompare(b.names[0].name))
                .map(
                    ({ id, name, names }): TreeNodeType => ({
                        id,
                        label: names[0].name,
                        hasCaret: false,
                        icon: "map",
                        nodeData: {
                            id,
                            name,
                        },
                    })
                );
            if (zoneName !== undefined) {
                // tslint:disable-next-line:no-non-null-assertion
                const zone = zoneItems.find((node) => node.nodeData!.name === zoneName);
                if (zone !== undefined) {
                    zone.isSelected = true;
                }
            }
            this.setState({ treeNodes: zoneItems });
        }
    }

    public componentWillUnmount() {
        this.deselectAllItems();
    }

    public render() {
        return <Tree contents={this.state.treeNodes} onNodeClick={this.onNodeClick} />;
    }

    private readonly onNodeClick = (node: TreeNodeType) => {
        this.deselectAllItems();
        node.isSelected = true;
        this.setState((state) => state);

        if (this.props.zoneType === ZoneType.Region && node.nodeData) {
            this.props.history.push(`/exploration/${node.nodeData.name}`);
            this.openZonePanel();
        } else if (this.props.zoneType === ZoneType.Zone && node.nodeData) {
            this.props.history.push(`/exploration/${this.props.match.params.regionName}/${node.nodeData.name}`);
        }
    };

    private deselectAllItems() {
        this.forEachNode(this.state.treeNodes, (node) => (node.isSelected = false));
    }

    private forEachNode(nodes: TreeNodeType[], callback: (node: TreeNodeType) => void) {
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

    private openZonePanel() {
        this.props.openPanel({
            component: ZonePanel,
            props: {
                zoneType: ZoneType.Zone,
                regionsQueryResponse: this.props.regionsQueryResponse,
            } as IZonePanelProps,
            title: "Zone",
        });
    }
}

const ZonePanel = withRouter(PureZonePanel);
export { ZonePanel };
