import { Alignment, Button, Navbar as BlueprintNavbar } from "@blueprintjs/core";
import React from "react";

export function Navbar() {
    return (
        <BlueprintNavbar>
            <BlueprintNavbar.Group align={Alignment.LEFT}>
                <BlueprintNavbar.Heading>Trivia Challenge</BlueprintNavbar.Heading>
                <BlueprintNavbar.Divider />
            </BlueprintNavbar.Group>
            <BlueprintNavbar.Group align={Alignment.RIGHT}>
                <BlueprintNavbar.Divider />
                <Button icon="user" minimal />
            </BlueprintNavbar.Group>
        </BlueprintNavbar>
    );
}
