import { DocumentNode } from "graphql";
import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

export const LocationQueryString = gql`
    query Location($name: ID!) {
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
` as DocumentNode;

export type LocationQueryResponse = {
    location: {
        id: string;
        name: string;
        names: {
            name: string;
        }[];
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

export type LocationQueryVariables = {
    name: string;
};

export class LocationQuery extends Query<LocationQueryResponse, LocationQueryVariables> {
    public static defaultProps: Partial<QueryProps> = {
        query: LocationQueryString,
    };
}
