import React from "react";
import { CollectionList } from "./components/CollectionList";
import { CompletionIndicator } from "./components/CompletionIndicator";
import { Header } from "./components/Header";
import { StartQuizButton } from "./components/StartQuizButton";
import styles from "./Overview.module.scss";

export function Overview() {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <Header />
                <div style={{ flex: 1 }} />
            </div>
            <div className={styles.row}>
                <div style={{ width: 250 }}>
                    <CompletionIndicator />
                </div>
                <div style={{ flex: 1 }} />
            </div>
            <div className={styles.row}>
                <StartQuizButton />
            </div>
            <div className={styles.row}>
                <CollectionList isCollection />
            </div>
            <div className={styles.row}>
                <CollectionList isCollection={false} />
            </div>
        </div>
    );
}
