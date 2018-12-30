import React from "react";
import shortid from "shortid";
import * as Constants from "../../../common/constants";
import { GameModeContainer, IGameModeContainerProps } from "../containers/GameModeContainer";
import Styles from "../styles/HomeView.module.scss";

export function HomeView() {
    const gameModes: IGameModeContainerProps[] = [
        {
            title: "Exploration Mode",
            description: `Adventure through various regions and try to catch all Pokémon by answering trivia qustions in
            order to fill up your Pokédex. Correctly answering difficult questions will vastly increase your chances of
            actually catching a Pokémon.`,
            buttonText: "Explore the World",
            url: Constants.ExploreRoute,
        },
        {
            title: "Trial of Ascendency",
            description: `Without training and experience your Pokémon won't be able to evolve on their own. By facing a
            trial of difficult questions, you will be able to gain experience points. You can spend those to acquire
            certain Pokémon that cannot be caught by normal means.`,
            buttonText: "Enter Trial of Ascendency",
            isDisabled: true,
            url: "/trial",
        },
    ];

    return (
        <div className={Styles.viewContainer}>
            {gameModes.map((gameModeProps) => (
                <GameModeContainer key={shortid.generate()} {...gameModeProps} />
            ))}
        </div>
    );
}
