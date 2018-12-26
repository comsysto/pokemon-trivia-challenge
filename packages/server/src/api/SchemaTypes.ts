type GraphQLID = string;

export interface Context {}

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

export interface ApiResource<T> {
    url: string;
}

export interface NamedApiResource<T> extends ApiResource<T> {
    name: string;
}

export interface Region {
    id: GraphQLID;
    name: string;
    names: Name[];
    locations: NamedApiResource<Location>[];
}

export interface Name {
    name: string;
    language: NamedApiResource<Language>;
}

export interface Language {
    id: GraphQLID;
    name: string;
    names: Name[];
    iso3166: string;
}

export interface Location {
    id: GraphQLID;
    name: string;
    names: Name[];
    region: NamedApiResource<Region>;
    areas: NamedApiResource<LocationArea>[];
}

export interface LocationArea {
    id: GraphQLID;
    name: string;
    names: Name[];
    location: NamedApiResource<Location>;
    pokemonEncounters: PokemonEncounter[];
}

export interface PokemonEncounter {
    pokemon: NamedApiResource<Pokemon>;
    versionDetails: VersionEncounterDetail[];
}

export interface Pokemon {
    id: GraphQLID;
    name: string;
    sprites: PokemonSprites;
    species: NamedApiResource<PokemonSpecies>;
}

export interface PokemonSprites {
    frontDefault: string;
}

export interface PokemonSpecies {
    id: GraphQLID;
    name: string;
    names: Name[];
    captureRate: number;
    flavorTextEntries: FlavorText[];
}

export interface FlavorText {
    flavorText: string;
    language: NamedApiResource<Language>;
    version: NamedApiResource<Version>;
}

export interface Version {
    id: GraphQLID;
    name: string;
    names: Name[];
}

export interface VersionEncounterDetail {
    version: NamedApiResource<Version>;
    maxChance: number;
    encounterDetails: Encounter[];
}

export interface Encounter {
    chance: number;
}
