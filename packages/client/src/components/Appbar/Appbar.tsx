import { Alignment, Button, Navbar } from "@blueprintjs/core";
import React from "react";

export function Appbar() {
    return (
        <Navbar fixedToTop>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Pokémon Trivia Challenge</Navbar.Heading>
                <Navbar.Divider />
                <Button icon="home" minimal text="Home" />
                <Button icon="list-detail-view" minimal text="Pokédex" />
                <Button icon="map" minimal text="Exploration" />
                <Button icon="lightbulb" minimal text="Trial" />
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                {/* <Button icon="user" minimal text="Christian" />
                <BlueprintNavbar.Divider /> */}
                <Button icon="log-out" minimal text="Log Out" />
                <Button icon="log-in" minimal text="Log In" />
                <Button icon="new-person" minimal text="Sign Up" />
            </Navbar.Group>
        </Navbar>
    );
}
