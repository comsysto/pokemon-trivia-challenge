import { IPanelProps } from "@blueprintjs/core";
import React, { Component } from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { RegionQuery } from "../../../api/graphql/RegionQuery";
import { ExploreRouteParams } from "../../../Routes";
import { LocationPanel, LocationPanelProps, TreeNodeItem } from "../components/LocationPanel";
import { WithExploreContext, withExploreContext } from "../contexts/ExploreContext";

type ZonePanelContainerBaseProps = WithApolloClient<
    IPanelProps & WithExploreContext & RouteComponentProps<ExploreRouteParams>
>;

class ZonePanelContainerBase extends Component<ZonePanelContainerBaseProps> {
    public componentDidMount() {
        const {
            exploreContext,
            match: {
                params: { selectedRegion, selectedZone },
            },
        } = this.props;

        // Automatically attempt to open the zone if it's supplied via the url
        if (selectedZone !== undefined) {
            exploreContext.changeLocation(selectedRegion, selectedZone);
        }
    }

    public render() {
        const { exploreContext } = this.props;

        return (
            <>
                {exploreContext.selectedRegion === undefined ? (
                    <></>
                ) : (
                    <RegionQuery variables={{ name: exploreContext.selectedRegion }}>
                        {({ loading, error, data }) => {
                            const contents: TreeNodeItem[] = [];

                            if (!loading && data !== undefined) {
                                contents.push(
                                    ...data.region.locations
                                        .sort((a, b) => a.names[0].name.localeCompare(b.names[0].name))
                                        .map(
                                            ({ id, name, names }): TreeNodeItem => ({
                                                id,
                                                label: names[0].name,
                                                icon: "map",
                                                isSelected: exploreContext.selectedZone === name,
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
                    </RegionQuery>
                )}
            </>
        );
    }

    private onNodeClick = (node: TreeNodeItem) => {
        const { exploreContext } = this.props;
        const { nodeData } = node;

        if (nodeData !== undefined) {
            exploreContext.changeLocation(exploreContext.selectedRegion, nodeData.name);
        }
    };
}

export const ZonePanelContainer = withExploreContext(withRouter(withApollo(ZonePanelContainerBase)));
