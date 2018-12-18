import { H5, Intent, ProgressBar } from "@blueprintjs/core";
import React from "react";

export function CompletionIndicator() {
    return (
        <>
            <H5>Current Zone Progression: 30%</H5>
            <ProgressBar value={0.3} intent={Intent.PRIMARY} animate={false} stripes={false} />
        </>
    );
}
