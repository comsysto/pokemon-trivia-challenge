export interface OpenTriviaDBApiResult {
    response_code: number;
    results: Question[];
}

interface Question {
    category: string;
    type: Type;
    difficulty: Difficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

enum Difficulty {
    Easy = "easy",
    Hard = "hard",
    Medium = "medium",
}

enum Type {
    Boolean = "boolean",
    Multiple = "multiple",
}
