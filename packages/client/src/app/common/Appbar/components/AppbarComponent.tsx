import { Alignment, Button, IButtonProps, Navbar } from "@blueprintjs/core";
import React from "react";
import shortid from "shortid";

export interface IAppbarComponentProps {
    leftButtons: IButtonProps[];
    rightButtons: IButtonProps[];
}

export function AppbarComponent(props: IAppbarComponentProps) {
    const { leftButtons, rightButtons } = props;

    return (
        <Navbar fixedToTop>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Pokémon Trivia Challenge</Navbar.Heading>
                <Navbar.Divider />
                {leftButtons.map((buttonProps) => (
                    <Button key={shortid.generate()} {...buttonProps} />
                ))}
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                {rightButtons.map((buttonProps) => (
                    <Button key={shortid.generate()} {...buttonProps} />
                ))}
            </Navbar.Group>
        </Navbar>
    );
}
