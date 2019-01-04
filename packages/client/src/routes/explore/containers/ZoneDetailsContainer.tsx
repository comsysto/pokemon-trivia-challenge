import React from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { LocationQuery } from "../../../api/graphql/LocationQuery";
import * as Constants from "../../../app/constants";
import { ExploreRouteParams } from "../../../Routes";
import { PokemonDetails, ZoneDetails, ZoneDetailsProps } from "../components/ZoneDetails";
import { WithExploreContext, withExploreContext } from "../contexts/ExploreContext";

type ZoneDetailsContainerBaseProps = WithApolloClient<RouteComponentProps<ExploreRouteParams> & WithExploreContext>;

function ZoneDetailsContainerBase(props: ZoneDetailsContainerBaseProps) {
    const { exploreContext, history } = props;

    const onStartExploration = () => {
        history.push(`${Constants.QuizRoute}/${exploreContext.selectedRegion}/${exploreContext.selectedZone}`);
    };

    let componentProps: ZoneDetailsProps = {
        hasError: false,
        isEmpty: true,
        isLoading: false,
    } as ZoneDetailsProps;

    return (
        <>
            {exploreContext.selectedZone === undefined ? (
                <ZoneDetails {...componentProps} />
            ) : (
                <LocationQuery variables={{ name: exploreContext.selectedZone }}>
                    {({ loading, error, data }) => {
                        let { hasError, isEmpty, isLoading, zoneName, hasPokemon } = componentProps;
                        const caughtPokemon: PokemonDetails[] = [];
                        let pokemonInZone: PokemonDetails[] = [];

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
                                const serializedData = JSON.parse(
                                    localStorage.getItem("caughtPokemon") || "{}"
                                ) as string[];
                                pokemonInZone = pokemonInZone.reduce(
                                    (previousValue, currentValue) => {
                                        if (serializedData.includes(currentValue.name)) {
                                            caughtPokemon.push(currentValue);
                                            return previousValue;
                                        } else {
                                            return [...previousValue, currentValue];
                                        }
                                    },
                                    [] as PokemonDetails[]
                                );
                            }
                        }

                        const progression = caughtPokemon.length / (pokemonInZone.length + caughtPokemon.length);
                        const progressionText = Math.floor(progression * 100).toString();

                        componentProps = {
                            hasError,
                            isEmpty,
                            isLoading,
                            zoneName,
                            hasPokemon,
                            pokemonInZone,
                            caughtPokemon,
                            progression,
                            progressionText,
                            onStartExploration,
                        };
                        return <ZoneDetails {...componentProps} />;
                    }}
                </LocationQuery>
            )}
        </>
    );
}

export const ZoneDetailsContainer = withExploreContext(withRouter(withApollo(ZoneDetailsContainerBase)));
