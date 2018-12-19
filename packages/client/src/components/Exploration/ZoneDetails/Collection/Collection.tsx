import React from "react";
import { ExplorationZoneDetailsCollectionCard } from "./Card";
import styles from "./Collection.module.scss";
import { ExplorationZoneDetailsCollectionHeader, IExplorationZoneDetailsCollectionHeaderProps } from "./Header";

export interface IExplorationZoneDetailsCollectionProps extends IExplorationZoneDetailsCollectionHeaderProps {}

export function ExplorationZoneDetailsCollection(props: IExplorationZoneDetailsCollectionProps) {
    return (
        <div>
            <div className={styles.row}>
                <ExplorationZoneDetailsCollectionHeader {...props} />
            </div>
            <div className={styles.row}>
                <ExplorationZoneDetailsCollectionCard isCollected={props.isCollection} />
                <ExplorationZoneDetailsCollectionCard isCollected={props.isCollection} />
                <ExplorationZoneDetailsCollectionCard isCollected={props.isCollection} />
                <ExplorationZoneDetailsCollectionCard isCollected={props.isCollection} />
                <ExplorationZoneDetailsCollectionCard isCollected={props.isCollection} />
                <ExplorationZoneDetailsCollectionCard isCollected={props.isCollection} />
                <ExplorationZoneDetailsCollectionCard isCollected={props.isCollection} />
                <ExplorationZoneDetailsCollectionCard isCollected={props.isCollection} />
                <ExplorationZoneDetailsCollectionCard isCollected={props.isCollection} />
                <ExplorationZoneDetailsCollectionCard isCollected={props.isCollection} />
                <ExplorationZoneDetailsCollectionCard isCollected={props.isCollection} />
                <ExplorationZoneDetailsCollectionCard isCollected={props.isCollection} />
            </div>
        </div>
    );
}
