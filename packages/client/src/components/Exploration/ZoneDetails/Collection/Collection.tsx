import React from "react";
import { PokemonCard } from "./PokemonCard";
import styles from "./Collection.module.scss";
import { Header, IHeaderProps } from "./Header";

export interface ICollectionProps extends IHeaderProps {}

export function Collection(props: ICollectionProps) {
    return (
        <div>
            <div className={styles.row}>
                <Header {...props} />
            </div>
            <div className={styles.row}>
                <PokemonCard isCollected={props.isCollection} />
                <PokemonCard isCollected={props.isCollection} />
                <PokemonCard isCollected={props.isCollection} />
                <PokemonCard isCollected={props.isCollection} />
                <PokemonCard isCollected={props.isCollection} />
                <PokemonCard isCollected={props.isCollection} />
                <PokemonCard isCollected={props.isCollection} />
                <PokemonCard isCollected={props.isCollection} />
                <PokemonCard isCollected={props.isCollection} />
                <PokemonCard isCollected={props.isCollection} />
                <PokemonCard isCollected={props.isCollection} />
                <PokemonCard isCollected={props.isCollection} />
            </div>
        </div>
    );
}
