import { H3 } from "@blueprintjs/core";
import React from "react";

export interface IExplorationZoneDetailsCollectionHeaderProps {
    isCollection: boolean;
}

export function ExplorationZoneDetailsCollectionHeader(props: IExplorationZoneDetailsCollectionHeaderProps) {
    return <H3>12 Pokémon {props.isCollection ? "already in collection" : "left to collect"}</H3>;
}
