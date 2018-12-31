import React from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { LocationQuery } from "../../../api/graphql/LocationQuery";
import { ExploreRouteParams } from "../../../Routes";
import { IZoneDetailsProps, ZoneDetails } from "../components/ZoneDetails";
import { WithExploreContext, withExploreContext } from "../contexts/ExploreContext";

function ZoneDetailsContainerBase(
    props: WithApolloClient<RouteComponentProps<ExploreRouteParams> & WithExploreContext>
) {
    const { exploreContext } = props;

    let componentProps: IZoneDetailsProps = {
        hasError: false,
        isEmpty: true,
        isLoading: false,
    } as IZoneDetailsProps;

    return (
        <>
            {exploreContext.selectedZone === undefined ? (
                <ZoneDetails {...componentProps} />
            ) : (
                <LocationQuery variables={{ name: exploreContext.selectedZone }}>
                    {({ loading, error, data }) => {
                        let { hasError, isEmpty, isLoading, zoneName, hasPokemon, pokemonInZone } = componentProps;

                        isEmpty = data === undefined;
                        hasError = error !== undefined;
                        isLoading = loading;

                        if (!loading && data !== undefined) {
                            const { location } = data;
                            zoneName = location.names[0].name;
                            hasPokemon = location.areas.length !== 0;

                            if (hasPokemon) {
                                pokemonInZone = location.areas
                                    .map((area) => area.pokemonEncounters)
                                    .reduce((previous, current) => [...previous, ...current])
                                    .map((item) => item.pokemon)
                                    .filter(
                                        (item, index, self) =>
                                            self.findIndex((inner) => inner.name === item.name) === index
                                    );
                            }
                        }

                        componentProps = { hasError, isEmpty, isLoading, zoneName, hasPokemon, pokemonInZone };
                        return <ZoneDetails {...componentProps} />;
                    }}
                </LocationQuery>
            )}
        </>
    );
}

export const ZoneDetailsContainer = withExploreContext(withRouter(withApollo(ZoneDetailsContainerBase)));
