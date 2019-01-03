import { Card, NonIdealState, Spinner } from "@blueprintjs/core";
import React from "react";
import { EncounterDetailsContainer } from "../containers/EncounterDetailsContainer";
import Styles from "../styles/Encounter.module.scss";

export type EncounterProps = {
    hasError: boolean;
    isLoading: boolean;
    hasPokemon?: boolean;
    name: string;
    sprite: string;
};

export function Encounter(props: EncounterProps) {
    const { hasError, isLoading, hasPokemon, name, sprite } = props;

    return (
        <Card className={Styles.fullSize}>
            {isLoading && <NonIdealState icon={<Spinner />} />}
            {(hasError || !hasPokemon) && (
                <NonIdealState
                    icon="warning-sign"
                    title="Failed to load encounter"
                    // tslint:disable-next-line:max-line-length
                    description="An exception has occurred while initiating the encounter. Please return to the zone selection and try it again."
                />
            )}
            {!isLoading && !hasError && hasPokemon && (
                <NonIdealState title={name} icon={<img src={sprite} />} description={<EncounterDetailsContainer />} />
            )}
        </Card>
    );
}
