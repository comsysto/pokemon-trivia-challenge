import { IPanelProps } from "@blueprintjs/core";
import React, { Component } from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { REGION_QUERY, RegionQueryResponse, RegionQueryVariables } from "../../../api/graphql/RegionQuery";
import * as Constants from "../../../app/constants";
import { ExploreRouteParams } from "../../../Routes";
import { ILocationPanelProps, LocationPanel, TreeNodeItem } from "../components/LocationPanel";

export interface IZonePanelContainerProps {
    updateZoneDetails(): void;
}

interface IZonePanelContainerState {
    isLoading: boolean;
    hasError: boolean;
    treeNodes: TreeNodeItem[];
}

class ZonePanelContainerBase extends Component<
    WithApolloClient<IPanelProps & IZonePanelContainerProps & RouteComponentProps<ExploreRouteParams>>,
    IZonePanelContainerState
> {
    public readonly state: IZonePanelContainerState = {
        isLoading: true,
        hasError: false,
        treeNodes: [],
    };

    public componentDidMount() {
        const {
            client,
            history,
            match: {
                params: { regionName, zoneName },
            },
        } = this.props;
        client
            .query<RegionQueryResponse, RegionQueryVariables>({
                query: REGION_QUERY,
                variables: { name: regionName || "" },
            })
            .then(({ loading, errors, data }) => {
                let { isLoading, hasError, treeNodes } = this.state;
                isLoading = loading;
                hasError = errors !== undefined;

                if (data !== undefined) {
                    treeNodes = data.region.locations
                        .sort((a, b) => a.names[0].name.localeCompare(b.names[0].name))
                        .map(
                            ({ id, name, names }): TreeNodeItem => ({
                                id,
                                label: names[0].name,
                                icon: "map",
                                nodeData: {
                                    name,
                                },
                            })
                        );
                }

                this.setState({ isLoading, hasError, treeNodes });

                // Automatically open the zone if it's supplied via the url
                if (zoneName !== undefined) {
                    const zoneNode = treeNodes.find(
                        (node) => node.nodeData !== undefined && node.nodeData.name === zoneName
                    );
                    if (zoneNode !== undefined) {
                        this.onNodeClick(zoneNode);
                    } else {
                        history.push(`${Constants.ExploreRoute}/${regionName}`);
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
            updateZoneDetails,
            match: {
                params: { regionName },
            },
        } = this.props;

        if (node.nodeData !== undefined) {
            this.forEachNode(this.state.treeNodes, (item) => (item.isSelected = false));
            node.isSelected = true;

            history.push(`${Constants.ExploreRoute}/${regionName}/${node.nodeData.name}`);
        }

        this.setState(({ treeNodes }) => ({ treeNodes }));
        updateZoneDetails();
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

export const ZonePanelContainer = withRouter(withApollo(ZonePanelContainerBase));
