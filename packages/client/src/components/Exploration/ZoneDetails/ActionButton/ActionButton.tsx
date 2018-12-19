import { Button, Intent } from "@blueprintjs/core";
import React from "react";

export function ActionButton() {
    return <Button intent={Intent.PRIMARY} text="Start Exploration" large />;
}
