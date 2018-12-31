import React, { Component } from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { LocationQueryResponse, LocationQueryString, LocationQueryVariables } from "../../../api/graphql/LocationQuery";
import { ExploreRouteParams } from "../../../Routes";
import { ZoneDetails } from "../components/ZoneDetails";

interface IZoneDetailsContainerState {
    isLoading: boolean;
    hasError: boolean;
    isEmpty: boolean;
}

class ZoneDetailsContainerBase extends Component<
    WithApolloClient<RouteComponentProps<ExploreRouteParams>>,
    IZoneDetailsContainerState
> {
    public readonly state: IZoneDetailsContainerState = {
        isLoading: false,
        hasError: false,
        isEmpty: false,
    };

    public componentDidMount() {
        const {
            client,
            match: {
                params: { zoneName },
            },
        } = this.props;

        if (zoneName !== undefined) {
            client
                .query<LocationQueryResponse, LocationQueryVariables>({
                    query: LocationQueryString,
                    variables: { name: zoneName },
                })
                .then(({ loading, errors, data }) => {
                    let { isLoading, hasError } = this.state;
                    isLoading = loading;
                    hasError = errors !== undefined;

                    if (data !== undefined) {
                        // TODO: Fetch zone data.
                    }

                    this.setState({ isLoading, hasError, isEmpty: false });
                });
        } else {
            this.setState({ isLoading: false, isEmpty: true });
        }
    }

    public render() {
        return <ZoneDetails {...this.state} />;
    }
}

export const ZoneDetailsContainer = withRouter(withApollo(ZoneDetailsContainerBase));
