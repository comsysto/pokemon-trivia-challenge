import React from "react";
import styles from "./CollectionList.module.scss";
import { Card } from "./components/Card";
import { Header, IHeaderProps } from "./components/Header";

// tslint:disable-next-line:no-empty-interface
export interface ICollectionListProps extends IHeaderProps {}

export function CollectionList(props: ICollectionListProps) {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <Header {...props} />
            </div>
            <div className={styles.row} style={{ }}>
                <Card isCollected={props.isCollection} />
                <Card isCollected={props.isCollection} />
                <Card isCollected={props.isCollection} />
                <Card isCollected={props.isCollection} />
                <Card isCollected={props.isCollection} />
                <Card isCollected={props.isCollection} />
                <Card isCollected={props.isCollection} />
                <Card isCollected={props.isCollection} />
                <Card isCollected={props.isCollection} />
                <Card isCollected={props.isCollection} />
                <Card isCollected={props.isCollection} />
                <Card isCollected={props.isCollection} />
            </div>
        </div>
    );
}
