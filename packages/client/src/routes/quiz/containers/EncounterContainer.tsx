import React, { Component } from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import { LocationQueryResponse, LocationQueryString, LocationQueryVariables } from "../../../api/graphql/LocationQuery";
import { Encounter, EncounterProps } from "../components/Encounter";
import { WithQuizContext, withQuizContext } from "../cotexts/QuizContext";

type EncounterContainerProps = WithApolloClient<WithQuizContext>;
type EncounterContainerState = Readonly<EncounterProps>;

class EncounterContainerBase extends Component<EncounterContainerProps, EncounterContainerState> {
    public readonly state: EncounterContainerState = {
        isLoading: true,
        hasError: false,
    } as EncounterContainerState;

    public componentDidMount() {
        const { client, quizContext } = this.props;

        // This should hopefully be always true, but better be safe than sorry nonetheless...
        if (quizContext.selectedZone !== undefined) {
            client
                .query<LocationQueryResponse, LocationQueryVariables>({
                    query: LocationQueryString,
                    variables: { name: quizContext.selectedZone },
                })
                .then(({ loading, errors, data }) => {
                    let { hasPokemon, name, sprite } = this.state;

                    if (!loading && data !== undefined) {
                        const { location } = data;
                        hasPokemon = location.areas.length !== 0;

                        if (hasPokemon) {
                            const pokemonInZone = location.areas
                                .map((area) => area.pokemonEncounters)
                                .reduce((previous, current) => [...previous, ...current])
                                .filter(
                                    (item, index, self) =>
                                        self.findIndex((inner) => inner.pokemon.name === item.pokemon.name) === index
                                );

                            // Create an interval separated into chunks of length maxChance for each pokemon to scale
                            // the probabilies accordingly.
                            const encounterInterval = pokemonInZone.flatMap(
                                (encounter, index): number[] => {
                                    // Just pick an arbitrary game version that is available since we can't be bothered
                                    // to map particular regions/zones to those versions. This way we just have to scale
                                    // the probabilities.
                                    const versionIndex = Math.floor(Math.random() * encounter.versionDetails.length);
                                    return Array(encounter.versionDetails[versionIndex].maxChance).fill(index);
                                }
                            );

                            // Pick an arbitrary index from the encounter interval which we will use to point to a
                            // specific Pokemon to encounter next.
                            const encounterIndex =
                                encounterInterval[Math.floor(Math.random() * encounterInterval.length)];
                            const encounterFoe = pokemonInZone[encounterIndex];

                            name = encounterFoe.pokemon.species.names[0].name;
                            sprite = encounterFoe.pokemon.sprites.frontDefault;

                            quizContext.setEncounterData({
                                captureRate: encounterFoe.pokemon.species.captureRate,
                                name: encounterFoe.pokemon.name,
                            });
                        }
                    }

                    this.setState({
                        isLoading: loading,
                        hasError: errors !== undefined,
                        hasPokemon,
                        name,
                        sprite,
                    });
                });
        }
    }

    public render() {
        const componentProps: EncounterProps = { ...this.state };
        return <Encounter {...componentProps} />;
    }
}

export const EncounterContainer = withQuizContext(withApollo(EncounterContainerBase));
