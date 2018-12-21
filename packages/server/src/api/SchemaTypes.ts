export interface Context {}

export interface ApiResource {
    url: string;
}

export interface NamedApiResource extends ApiResource {
    name: string;
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
    names: Name[];
}

export interface Name {
    name: string;
    language: NamedApiResource;
}

export interface Language {
    id: number;
    name: string;
    names: Name[];
    iso3166: string;
}
