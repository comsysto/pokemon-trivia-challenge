import { IPanelProps } from "@blueprintjs/core";
import React, { Component } from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { RegionsQueryResponse, RegionsQueryString } from "../../../api/graphql/RegionsQuery";
import * as Constants from "../../../app/constants";
import { ExploreRouteParams } from "../../../Routes";
import { ILocationPanelProps, LocationPanel, TreeNodeItem } from "../components/LocationPanel";
import { ZonePanelContainer } from "./ZonePanelContainer";

interface IRegionPanelContainerState {
    isLoading: boolean;
    hasError: boolean;
    treeNodes: TreeNodeItem[];
}

class RegionPanelContainerBase extends Component<
    WithApolloClient<IPanelProps & RouteComponentProps<ExploreRouteParams>>,
    IRegionPanelContainerState
> {
    public readonly state: IRegionPanelContainerState = {
        isLoading: true,
        hasError: false,
        treeNodes: [],
    };

    public componentDidMount() {
        const {
            client,
            history,
            match: {
                params: { regionName },
            },
        } = this.props;
        client.query<RegionsQueryResponse>({ query: RegionsQueryString }).then(({ loading, errors, data }) => {
            let { isLoading, hasError, treeNodes } = this.state;
            isLoading = loading;
            hasError = errors !== undefined;

            if (data !== undefined) {
                treeNodes = data.regions.map(
                    ({ id, name, names }): TreeNodeItem => ({
                        id,
                        label: names[0].name,
                        icon: "globe",
                        nodeData: {
                            name,
                        },
                    })
                );
            }

            this.setState({ isLoading, hasError, treeNodes });

            // Automatically open the region if it's supplied via the url
            if (regionName !== undefined) {
                const regionNode = treeNodes.find(
                    (node) => node.nodeData !== undefined && node.nodeData.name === regionName
                );
                if (regionNode !== undefined) {
                    this.onNodeClick(regionNode);
                } else {
                    history.push(Constants.ExploreRoute);
                }
            }
        });
    }

    public render() {
        const { hasError, isLoading, treeNodes } = this.state;

        const componentProps: ILocationPanelProps = {
            contents: treeNodes,
            isLoading,
            hasError,
            onNodeClick: this.onNodeClick,
        };
        return <LocationPanel {...componentProps} />;
    }

    private onNodeClick = (node: TreeNodeItem) => {
        const {
            history,
            openPanel,
            match: {
                params: { zoneName },
            },
        } = this.props;
        const { nodeData } = node;

        if (nodeData !== undefined) {
            this.forEachNode(this.state.treeNodes, (item) => (item.isSelected = false));
            node.isSelected = true;

            history.push(`${Constants.ExploreRoute}/${nodeData.name}${zoneName !== undefined ? `/${zoneName}` : ""}`);
            openPanel({
                title: `Zone`,
                component: ZonePanelContainer,
            });
        }

        this.setState(({ treeNodes }) => ({ treeNodes }));
    };

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
}

export const RegionPanelContainer = withRouter(withApollo(RegionPanelContainerBase));
