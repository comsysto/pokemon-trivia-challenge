import React from "react";
import { QuizContainer } from "../containers/QuizContainer";
import { QuizContextProvider } from "../cotexts/QuizContext";

export function QuizView() {
    return (
        <QuizContextProvider>
            <QuizContainer />
        </QuizContextProvider>
    );
}
