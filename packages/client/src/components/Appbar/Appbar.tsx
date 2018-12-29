import { Alignment, Button, Navbar } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

function PureAppbar(props: RouteComponentProps) {
    const onHome = () => {
        props.history.push("/");
    };
    const onExploration = () => {
        props.history.push("/exploration");
    };

    return (
        <Navbar fixedToTop>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Pokémon Trivia Challenge</Navbar.Heading>
                <Navbar.Divider />
                <Button icon="home" minimal text="Home" onClick={onHome} />
                <Button icon="list-detail-view" minimal text="Pokédex" disabled />
                <Button icon="map" minimal text="Exploration" onClick={onExploration} />
                <Button icon="lightbulb" minimal text="Trial" disabled />
            </Navbar.Group>
            {/* <Navbar.Group align={Alignment.RIGHT}>
                <Button icon="log-out" minimal text="Log Out" disabled />
                <Button icon="log-in" minimal text="Log In" disabled />
                <Button icon="new-person" minimal text="Sign Up" disabled />
            </Navbar.Group> */}
        </Navbar>
    );
}

const Appbar = withRouter(PureAppbar);

export { Appbar };
