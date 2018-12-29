import React from "react";
import { GameMode, IGameModeProps } from "../../components/GameMode";
import styles from "./GameMode.module.scss";

const gameModeCards: IGameModeProps[] = [
    {
        title: "Exploration Mode",
        description: `Adventure through various regions and try to catch all Pokémon by answering trivia qustions in
        order to fill up your Pokédex. Correctly answering difficult questions will vastly increase your chances of
        actually catching a Pokémon.`,
        actionText: "Explore the World",
        url: "/exploration",
    },
    {
        title: "Trial of Ascendency",
        description: `Without training and experience your Pokémon won't be able to evolve on their own. By facing a
        trial of difficult questions, you will be able to gain experience points. You can spend those to acquire certain
        Pokémon that cannot be caught by normal means.`,
        actionText: "Enter Trial of Ascendency",
        url: "/trial",
        isDisabled: true,
    },
];

export function GameModeView() {
    return (
        <div className={styles.container}>
            {gameModeCards.map((props) => (
                <GameMode {...props} key={props.url} />
            ))}
        </div>
    );
}
