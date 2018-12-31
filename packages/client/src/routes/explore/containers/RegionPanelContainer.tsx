import { IPanelProps } from "@blueprintjs/core";
import React, { Component } from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { RegionsQuery } from "../../../api/graphql/RegionsQuery";
import { ExploreRouteParams } from "../../../Routes";
import { LocationPanel, LocationPanelProps, TreeNodeItem } from "../components/LocationPanel";
import { WithExploreContext, withExploreContext } from "../contexts/ExploreContext";
import { ZonePanelContainer } from "./ZonePanelContainer";

export type RegionPanelContainerProps = WithApolloClient<
    IPanelProps & WithExploreContext & RouteComponentProps<ExploreRouteParams>
>;

class RegionPanelContainerBase extends Component<RegionPanelContainerProps> {
    public componentDidMount() {
        const {
            match: {
                params: { selectedRegion, selectedZone },
            },
        } = this.props;

        // Automatically attempt to open the region if it's supplied via the url
        if (selectedRegion !== undefined) {
            this.changeLocation(selectedRegion, selectedZone);
        }
    }

    public render() {
        const { exploreContext } = this.props;

        return (
            <RegionsQuery>
                {({ loading, error, data }) => {
                    const contents: TreeNodeItem[] = [];

                    if (!loading && data !== undefined) {
                        contents.push(
                            ...data.regions.map(
                                ({ id, name, names }): TreeNodeItem => ({
                                    id,
                                    label: names[0].name,
                                    icon: "globe",
                                    isSelected: exploreContext.selectedRegion === name,
                                    nodeData: {
                                        name,
                                    },
                                })
                            )
                        );
                    }

                    const componentProps: LocationPanelProps = {
                        contents,
                        isLoading: loading,
                        hasError: error !== undefined,
                        onNodeClick: this.onNodeClick,
                    };
                    return <LocationPanel {...componentProps} />;
                }}
            </RegionsQuery>
        );
    }

    private changeLocation = (selectedRegion?: string, selectedZone?: string) => {
        const { openPanel, exploreContext } = this.props;

        exploreContext.changeLocation(selectedRegion, selectedZone);
        openPanel({
            title: `Zone`,
            component: ZonePanelContainer,
        });
    };

    private onNodeClick = (node: TreeNodeItem) => {
        const { exploreContext } = this.props;
        const { nodeData } = node;

        if (nodeData !== undefined) {
            this.changeLocation(nodeData.name, exploreContext.selectedZone);
        }
    };
}

export const RegionPanelContainer = withExploreContext(withRouter(withApollo(RegionPanelContainerBase)));
