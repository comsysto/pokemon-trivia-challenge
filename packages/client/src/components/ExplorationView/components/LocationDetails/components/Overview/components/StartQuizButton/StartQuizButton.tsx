import { Button, Intent } from "@blueprintjs/core";
import React from "react";

export function StartQuizButton() {
    return <Button large intent={Intent.PRIMARY} text="Start Exploration" />;
}
