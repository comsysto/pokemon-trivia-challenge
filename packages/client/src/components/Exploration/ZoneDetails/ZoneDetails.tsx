import { Callout, H1, H3, H4, H5, Intent, NonIdealState, ProgressBar, Spinner } from "@blueprintjs/core";
import { ApolloError } from "apollo-client";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { LocationQuery } from "../../../queries/LocationQuery";
import { LocationsQuery } from "../../../queries/LocationsQuery";
import { ExplorationRouteParams } from "../../../Routes";
import { ActionButton } from "./ActionButton";
import { PokemonCard } from "./PokemonCard";
import styles from "./ZoneDetails.module.scss";

function LoadingSpinner() {
    return <NonIdealState icon={<Spinner />} />;
}

function ServerErrorIndicator(props: ApolloError) {
    return <NonIdealState icon="error" description={`The GraphQL server encountered an error: ${props.message}`} />;
}

function UnexpectedErrorIndicator() {
    return <NonIdealState icon="error" description="The GraphQL server returned no result." />;
}

interface IPureZoneDetailsContainer {
    zoneId: string;
}

function ZoneDetailsContainer(props: IPureZoneDetailsContainer) {
    const { zoneId } = props;

    return (
        <>
            <LocationQuery variables={{ id: zoneId }}>
                {({ data }) => {
                    if (data === undefined || data.location === undefined) {
                        return <LoadingSpinner />;
                    }

                    const { location } = data;

                    const hasPokemon = location.areas.length !== 0;
                    let pokemonInZone: {
                        name: string;
                        sprites: {
                            frontDefault: string;
                        };
                        species: {
                            names: {
                                name: string;
                            }[];
                        };
                    }[] = [];

                    if (hasPokemon) {
                        pokemonInZone = location.areas
                            .map((area) => area.pokemonEncounters)
                            .reduce((previous, current) => [...previous, ...current])
                            .map((item) => item.pokemon)
                            .filter(
                                (item, index, self) => self.findIndex((inner) => inner.name === item.name) === index
                            );
                    }

                    return (
                        <>
                            <div className={styles.row}>
                                <H1>{location.names[0].name}</H1>
                                <div className={styles.spacer} />
                            </div>
                            {!hasPokemon && (
                                <div className={styles.row}>
                                    <Callout intent={Intent.WARNING}>
                                        <H4>No Pokémon in this zone</H4>
                                        Please select another zone from the list to continue your exploration.
                                    </Callout>
                                </div>
                            )}
                            {hasPokemon && (
                                <>
                                    <div className={styles.row}>
                                        <div className={styles.progress}>
                                            <H5>Current Zone Progression: 0%</H5>
                                            <ProgressBar
                                                value={0}
                                                intent={Intent.PRIMARY}
                                                animate={false}
                                                stripes={false}
                                            />
                                        </div>
                                        <div className={styles.spacer} />
                                    </div>
                                    <div className={styles.row}>
                                        <ActionButton />
                                    </div>
                                    <div className={styles.row}>
                                        <div>
                                            <div className={styles.innerRow}>
                                                <H3>{pokemonInZone.length} Pokémon left to collect</H3>
                                            </div>
                                            <div className={styles.innerRow}>
                                                {pokemonInZone.map((pokemon) => (
                                                    <PokemonCard
                                                        name={pokemon.species.names[0].name}
                                                        sprite={pokemon.sprites.frontDefault}
                                                        key={`${location.names[0].name}-${pokemon.name}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    );
                }}
            </LocationQuery>
        </>
    );
}

function PureZoneDetails(props: RouteComponentProps<ExplorationRouteParams>) {
    const {
        match: {
            params: { zoneName },
        },
    } = props;

    return (
        <LocationsQuery>
            {({ loading, error, data }) => {
                let currentZoneId = "";
                if (data !== undefined && data.locations !== undefined) {
                    const currentLocation = data.locations.find((location) => location.name === zoneName);
                    if (currentLocation !== undefined) {
                        currentZoneId = currentLocation.id;
                    }
                }

                return (
                    <div className={styles.container}>
                        {loading && <LoadingSpinner />}
                        {error && <ServerErrorIndicator {...error} />}
                        {data === undefined && <UnexpectedErrorIndicator />}
                        {data !== undefined && currentZoneId !== "" && <ZoneDetailsContainer zoneId={currentZoneId} />}
                    </div>
                );
            }}
        </LocationsQuery>
    );
}

const ZoneDetails = withRouter(PureZoneDetails);
export { ZoneDetails };
