export interface Context {
}

export interface Question {
    category: string;
    // tslint:disable-next-line:no-reserved-keywords
    type: string;
    difficulty: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}

export interface Region {
    id: number;
    name: string;
}
