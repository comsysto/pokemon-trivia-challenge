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
}

export const QuizContextProvider = withRouter(QuizContextProviderBase);

export type WithQuizContext = { quizContext: QuizContextProps };
export const withQuizContext = createHoc<WithQuizContext, QuizContextProps>(Consumer, "quizContext");
