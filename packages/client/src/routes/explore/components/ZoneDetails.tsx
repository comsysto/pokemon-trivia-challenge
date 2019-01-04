import { Button, Callout, H1, H3, H4, H5, Intent, NonIdealState, ProgressBar, Spinner } from "@blueprintjs/core";
import React from "react";
import Styles from "../styles/ZoneDetails.module.scss";
import { PokemonCard } from "./PokemonCard";

export type PokemonDetails = {
    name: string;
    sprites: {
        frontDefault: string;
    };
    species: {
        names: {
            name: string;
        }[];
    };
};

export type ZoneDetailsProps = {
    isLoading: boolean;
    hasError: boolean;
    isEmpty: boolean;

    zoneName: string;
    hasPokemon: boolean;
    pokemonInZone: PokemonDetails[];
    caughtPokemon: PokemonDetails[];

    progression: number;
    progressionText: string;

    onStartExploration(): void;
};

// TODO: REFACTOR AND BREAK THIS MONSTER APART!
// tslint:disable-next-line:max-func-body-length
export function ZoneDetails(props: ZoneDetailsProps) {
    const {
        isLoading,
        hasError,
        isEmpty,
        hasPokemon,
        zoneName,
        pokemonInZone,
        caughtPokemon,
        progression,
        progressionText,
        onStartExploration,
    } = props;

    return (
        <>
            {isLoading && <NonIdealState icon={<Spinner />} />}
            {hasError && (
                <NonIdealState
                    icon="warning-sign"
                    title="Failed to load zone"
                    description="An exception has occurred while fetching the data. Please try again later."
                />
            )}
            {isEmpty && (
                <NonIdealState
                    title="Select a location to show more details"
                    // tslint:disable-next-line:max-line-length
                    description="Once you select a location, you will see further details about it. This includes an overview of all Pokémon that you already caught in the zone and those who are still missing in your Pokédex."
                    icon="map"
                />
            )}
            {!isLoading && !hasError && !isEmpty && (
                <div className={Styles.container}>
                    <div className={Styles.row}>
                        <H1>{zoneName}</H1>
                        <div className={Styles.flexSpacer} />
                    </div>
                    {!hasPokemon ? (
                        <div className={Styles.row}>
                            <Callout intent={Intent.WARNING}>
                                <H4>There are currently no Pokémon in this zone</H4>
                                Please select another zone from the list to continue your exploration in a different
                                location.
                            </Callout>
                        </div>
                    ) : (
                        <>
                            <div className={Styles.row}>
                                {pokemonInZone.length > 0 && (
                                    <>
                                        <Button
                                            intent={Intent.PRIMARY}
                                            icon="compass"
                                            text="Start Exploration"
                                            large
                                            onClick={onStartExploration}
                                        />
                                        <div className={Styles.smallSpacer} />
                                    </>
                                )}
                                <div className={Styles.progress}>
                                    <H5>Current Zone Completion: {progressionText}%</H5>
                                    <ProgressBar
                                        value={progression}
                                        intent={Intent.PRIMARY}
                                        animate={false}
                                        stripes={false}
                                    />
                                </div>
                                <div className={Styles.flexSpacer} />
                            </div>
                            {pokemonInZone.length > 0 && (
                                <div className={Styles.row}>
                                    <div>
                                        <div className={Styles.innerRow}>
                                            <H3>{pokemonInZone.length} Pokémon left to collect</H3>
                                        </div>
                                        <div className={Styles.innerRow}>
                                            {pokemonInZone.map((pokemon) => (
                                                <PokemonCard
                                                    name={pokemon.species.names[0].name}
                                                    sprite={pokemon.sprites.frontDefault}
                                                    key={`${zoneName}-${pokemon.name}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {caughtPokemon.length > 0 && (
                                <div className={Styles.row}>
                                    <div>
                                        <div className={Styles.innerRow}>
                                            <H3>{caughtPokemon.length} Pokémon already in collection</H3>
                                        </div>
                                        <div className={Styles.innerRow}>
                                            {caughtPokemon.map((pokemon) => (
                                                <PokemonCard
                                                    name={pokemon.species.names[0].name}
                                                    sprite={pokemon.sprites.frontDefault}
                                                    key={`${zoneName}-${pokemon.name}`}
                                                    isCollected
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
}
