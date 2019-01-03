import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

export const EncounterQueryString = gql`
    query Encounter($name: ID!) {
        location(name: $name) {
            id
            name
            names(languages: [EN]) {
                name
            }
            areas {
                pokemonEncounters {
                    versionDetails {
                        maxChance
                    }
                    pokemon {
                        name
                        sprites {
                            frontDefault
                        }
                        species {
                            names(languages: [EN]) {
                                name
                            }
                            captureRate
                        }
                    }
                }
            }
        }
    }
`;

export type EncounterQueryResponse = {
    location: {
        areas: {
            pokemonEncounters: {
                versionDetails: {
                    maxChance: number;
                }[];
                pokemon: {
                    name: string;
                    sprites: {
                        frontDefault: string;
                    };
                    species: {
                        names: {
                            name: string;
                        }[];
                        captureRate: number;
                    };
                };
            }[];
        }[];
    };
};

export type EncounterQueryVariables = {
    name: string;
};

export class EncounterQuery extends Query<EncounterQueryResponse, EncounterQueryVariables> {
    public static defaultProps: Partial<QueryProps> = {
        query: EncounterQueryString,
    };
}
