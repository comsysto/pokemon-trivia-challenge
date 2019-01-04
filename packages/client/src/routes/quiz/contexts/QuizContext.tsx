import { Intent, Toaster } from "@blueprintjs/core";
import React, { Component, createContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { QuizRouteParams } from "../../../Routes";
import { createHoc } from "../../../utils";

export type EncounterData = {
    name: string;
    captureRate: number;
};

type QuizContextState = Readonly<{
    selectedZone?: string;
    encounterData?: EncounterData;
    difficulty?: string;
    hasFinished?: boolean;
    isCorrect?: boolean;
    answerOrder?: number[];
}>;

type QuizContextActions = {
    setEncounterData(encounterData: EncounterData): void;
    setDifficulty(difficulty: string): void;
    finishQuiz(isCorrect?: boolean): void;
    getShuffledAnswers(): number[];
};

export type QuizContextProps = QuizContextState & QuizContextActions;

const { Consumer, Provider } = createContext<QuizContextProps>({} as QuizContextProps);

type QuizContextProviderBaseProps = RouteComponentProps<QuizRouteParams>;

class QuizContextProviderBase extends Component<QuizContextProviderBaseProps, QuizContextState>
    implements QuizContextActions {
    public readonly state: QuizContextState = {} as QuizContextState;

    public componentDidMount() {
        const {
            match: { params },
        } = this.props;

        this.setState({ ...params });
    }

    public render() {
        const props: QuizContextProps = {
            ...this.state,
            setDifficulty: this.setDifficulty,
            setEncounterData: this.setEncounterData,
            finishQuiz: this.finishQuiz,
            getShuffledAnswers: this.getShuffledAnswers,
        };

        return <Provider value={props}>{this.props.children}</Provider>;
    }

    public readonly setDifficulty = (difficulty: string) => {
        this.setState({ difficulty });
    };

    public readonly setEncounterData = (encounterData: EncounterData) => {
        this.setState({ encounterData });
    };

    public readonly finishQuiz = (isCorrect?: boolean) => {
        this.setState({ hasFinished: true, isCorrect });

        const { difficulty, encounterData } = this.state;
        if (difficulty !== undefined && encounterData !== undefined && isCorrect) {
            let randomNumber: number;
            switch (difficulty) {
                case "Easy":
                    randomNumber = this.getRandomNumber(0, 255);
                    break;
                case "Medium":
                    randomNumber = this.getRandomNumber(0, 200);
                    break;
                case "Hard":
                    randomNumber = this.getRandomNumber(0, 150);
                    break;
                default:
                    randomNumber = 0;
            }

            const isCaught = randomNumber <= encounterData.captureRate;

            const toaster = Toaster.create();
            toaster.show({
                intent: isCaught ? Intent.SUCCESS : Intent.DANGER,
                icon: "info-sign",
                message: isCaught
                    ? "Success! You caught the Pokémon and it was added to your collection."
                    : "The Pokémon broke free from the Poké Ball. Better luck next time.",
            });

            if (isCaught) {
                const serializedData = JSON.parse(localStorage.getItem("caughtPokemon") || "{}") as string[];
                if (serializedData.length > 0) {
                    if (serializedData.includes(encounterData.name)) {
                        return;
                    }
                    serializedData.push(encounterData.name);
                    localStorage.setItem("caughtPokemon", JSON.stringify(serializedData));
                } else {
                    localStorage.setItem("caughtPokemon", JSON.stringify([encounterData.name]));
                }
            }
        }
    };

    public readonly getShuffledAnswers = () => {
        // tslint:disable-next-line:no-function-expression
        const shuffleArray = function<T>(array: T[]) {
            // tslint:disable-next-line:no-increment-decrement
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };

        if (this.state.answerOrder === undefined) {
            const newAnswerOrder = [0, 1, 2, 3];
            shuffleArray(newAnswerOrder);
            this.setState({ answerOrder: newAnswerOrder });
            return newAnswerOrder;
        }

        return this.state.answerOrder;
    };

    private getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export const QuizContextProvider = withRouter(QuizContextProviderBase);

export type WithQuizContext = { quizContext: QuizContextProps };
export const withQuizContext = createHoc<WithQuizContext, QuizContextProps>(Consumer, "quizContext");
