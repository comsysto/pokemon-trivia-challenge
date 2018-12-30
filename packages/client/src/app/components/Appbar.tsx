import { Alignment, Button, IButtonProps, Navbar } from "@blueprintjs/core";
import React from "react";
import shortid from "shortid";
import * as Constants from "../constants";

export interface IAppbarProps {
    leftButtons: IButtonProps[];
    rightButtons: IButtonProps[];
}

export function Appbar(props: IAppbarProps) {
    const { leftButtons, rightButtons } = props;

    return (
        <Navbar fixedToTop>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>{Constants.AppTitle}</Navbar.Heading>
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
