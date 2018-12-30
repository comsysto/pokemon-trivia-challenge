import { Button, Callout, H1, H3, H4, H5, Intent, NonIdealState, ProgressBar, Spinner } from "@blueprintjs/core";
import React from "react";
import Styles from "../styles/ZoneDetails.module.scss";
import { PokemonCard } from "./PokemonCard";

export interface IZoneDetailsProps {
    isLoading: boolean;
    hasError: boolean;
    isEmpty: boolean;
}

export function ZoneDetails(props: IZoneDetailsProps) {
    const { isLoading, hasError, isEmpty } = props;

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
                        <H1>Zone Name</H1>
                        <div className={Styles.flexSpacer} />
                    </div>
                    <div className={Styles.row}>
                        <Callout intent={Intent.WARNING}>
                            <H4>There are currently no Pokémon in this zone</H4>
                            Please select another zone from the list to continue your exploration in a different
                            location.
                        </Callout>
                    </div>
                    <div className={Styles.row}>
                        <Button intent={Intent.PRIMARY} icon="compass" text="Start Exploration" large disabled />
                        <div className={Styles.smallSpacer} />
                        <div className={Styles.progress}>
                            <H5>Current Zone Completion: 0%</H5>
                            <ProgressBar value={0} intent={Intent.PRIMARY} animate={false} stripes={false} />
                        </div>
                        <div className={Styles.flexSpacer} />
                    </div>
                    <div className={Styles.row}>
                        <div>
                            <div className={Styles.innerRow}>
                                <H3>X Pokémon left to collect</H3>
                            </div>
                            <div className={Styles.innerRow}>
                                <PokemonCard
                                    name="Name"
                                    // tslint:disable-next-line:max-line-length
                                    sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
