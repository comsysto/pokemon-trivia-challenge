import { IPanelProps, ITreeNode, Tree } from "@blueprintjs/core";
import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { RegionsQueryResponse } from "../../../../queries/RegionsQuery";
import { ExplorationRouteParams } from "../../../../Routes";

type TreeNodeItem = ITreeNode<{ name: string }>;

export enum ZoneType {
    Region,
    Zone,
}

export interface IZonePanelProps {
    zoneType: ZoneType;
    regionsQueryResponse: RegionsQueryResponse;
}

export interface IZonePanelState {
    readonly treeNodes: TreeNodeItem[];
}

class PureZonePanel extends Component<
    IPanelProps & IZonePanelProps & RouteComponentProps<ExplorationRouteParams>,
    IZonePanelState
> {
    public readonly state: IZonePanelState = {
        treeNodes: [],
    };

    public componentDidMount() {
        if (this.props.zoneType === ZoneType.Region) {
            this.onRegionMount();
        } else if (this.props.zoneType === ZoneType.Zone) {
            this.onZoneMount();
        }
    }

    public componentWillUnmount() {
        this.deselectAllItems();
    }

    public render() {
        return <Tree contents={this.state.treeNodes} onNodeClick={this.onNodeClick} />;
    }

    private readonly onNodeClick = (node: TreeNodeItem) => {
        const { history, zoneType } = this.props;

        this.deselectAllItems();
        node.isSelected = true;
        this.setState((state) => state);

        if (zoneType === ZoneType.Region && node.nodeData) {
            history.push(`/exploration/${node.nodeData.name}`);
            this.openZonePanel();
        } else if (zoneType === ZoneType.Zone && node.nodeData) {
            history.push(`/exploration/${this.props.match.params.regionName}/${node.nodeData.name}`);
        }
    };

    private deselectAllItems() {
        this.forEachNode(this.state.treeNodes, (node) => (node.isSelected = false));
    }

    private forEachNode(nodes: TreeNodeItem[], callback: (node: TreeNodeItem) => void) {
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

    private onRegionMount() {
        const { regionName } = this.props.match.params;
        const {
            history,
            regionsQueryResponse: { regions },
        } = this.props;

        const regionItems = regions.map(
            ({ id, name, names }): TreeNodeItem => ({
                id,
                label: names[0].name,
                hasCaret: false,
                icon: "globe",
                nodeData: {
                    name,
                },
            })
        );
        this.setState({ treeNodes: regionItems });

        if (regionName !== undefined) {
            if (regions.find((region) => region.name === regionName) === undefined) {
                history.push("/exploration");
            } else {
                this.openZonePanel();
            }
        }
    }

    private onZoneMount() {
        const { regionName, zoneName } = this.props.match.params;
        const {
            history,
            regionsQueryResponse: { regions },
        } = this.props;

        const region = regions.find(({ name }) => name === regionName);
        if (region === undefined) {
            history.push("/exploration");
        } else {
            const zoneItems = region.locations
                .sort((a, b) => a.names[0].name.localeCompare(b.names[0].name))
                .map(
                    ({ id, name, names }): TreeNodeItem => ({
                        id,
                        label: names[0].name,
                        hasCaret: false,
                        icon: "map",
                        nodeData: {
                            name,
                        },
                    })
                );
            if (zoneName !== undefined) {
                // tslint:disable-next-line:no-non-null-assertion
                const zone = zoneItems.find((node) => node.nodeData!.name === zoneName);
                if (zone === undefined) {
                    history.push(`/exploration/${regionName}`);
                } else {
                    zone.isSelected = true;
                }
            }
            this.setState({ treeNodes: zoneItems });
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
