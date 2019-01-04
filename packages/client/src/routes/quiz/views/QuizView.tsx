import React from "react";
import { QuizContainer } from "../containers/QuizContainer";
import { QuizContextProvider } from "../contexts/QuizContext";

export function QuizView() {
    return (
        <QuizContextProvider>
            <QuizContainer />
        </QuizContextProvider>
    );
}
