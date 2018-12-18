import { Alignment, Button, Navbar as BlueprintNavbar } from "@blueprintjs/core";
import React from "react";

export function Navbar() {
    return (
        <BlueprintNavbar fixedToTop>
            <BlueprintNavbar.Group align={Alignment.LEFT}>
                <BlueprintNavbar.Heading>PTC</BlueprintNavbar.Heading>
                <BlueprintNavbar.Divider />
                <Button icon="home" minimal text="Home" />
                <Button icon="list-detail-view" minimal text="Pokédex" />
                <Button icon="map" minimal text="Exploration" />
                <Button icon="lightbulb" minimal text="Trial" />
            </BlueprintNavbar.Group>
            <BlueprintNavbar.Group align={Alignment.RIGHT}>
                {/* <Button icon="user" minimal text="Christian" />
                <BlueprintNavbar.Divider /> */}
                <Button icon="log-out" minimal text="Log Out" />
                <Button icon="log-in" minimal text="Log In" />
                <Button icon="new-person" minimal text="Sign Up" />
            </BlueprintNavbar.Group>
        </BlueprintNavbar>
    );
}
