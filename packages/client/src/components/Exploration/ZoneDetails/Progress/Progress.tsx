import { H5, Intent, ProgressBar } from "@blueprintjs/core";
import React from "react";

export function Progress() {
    const progress = Math.random();

    return (
        <>
            <H5>Current Zone Progression: {Math.floor(progress * 100)}%</H5>
            <ProgressBar value={progress} intent={Intent.PRIMARY} animate={false} stripes={false} />
        </>
    );
}
