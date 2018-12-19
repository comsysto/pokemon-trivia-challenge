import { H3 } from "@blueprintjs/core";
import React from "react";

export interface IHeaderProps {
    isCollection: boolean;
}

export function Header(props: IHeaderProps) {
    return <H3>12 Pokémon {props.isCollection ? "already in collection" : "left to collect"}</H3>;
}
