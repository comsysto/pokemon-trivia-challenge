import React from "react";

export function QuizEncounterCard() {
    const id = Math.floor(Math.random() * 650) + 0;

    return <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />;
}
