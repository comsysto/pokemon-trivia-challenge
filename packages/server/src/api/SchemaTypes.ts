export interface Context {}

export interface ApiResource<T> {
    url: string;
}

export interface NamedApiResource<T> extends ApiResource<T> {
    name: string;
}

export interface Node {
    id: number;
    name: string;
}

// Open Trivia DB API

export interface Question {
    category: string;
    // tslint:disable-next-line:no-reserved-keywords
    type: string;
    difficulty: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}

// PokeAPI

export interface Region {
    id: number;
    name: string;
    names: Name[];
    locations: NamedApiResource<Location>[];
}

export interface Name {
    name: string;
    language: NamedApiResource<Language>;
}

export interface Language {
    id: number;
    name: string;
    names: Name[];
    iso3166: string;
}

export interface Location {
    id: number;
    name: string;
    names: Name[];
    region: NamedApiResource<Region>;
    areas: NamedApiResource<LocationArea>[];
}

export interface LocationArea {
    id: number;
    name: string;
    names: Name[];
    location: NamedApiResource<Location>;
}
