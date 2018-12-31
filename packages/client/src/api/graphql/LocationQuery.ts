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
                    pokemon {
                        name
                        sprites {
                            frontDefault
                        }
                        species {
                            names(languages: [EN]) {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`;

export type LocationQueryResponse = {
    location: {
        id: string;
        name: string;
        names: {
            name: string;
        }[];
        areas: {
            pokemonEncounters: {
                pokemon: {
                    name: string;
                    sprites: {
                        frontDefault: string;
                    };
                    species: {
                        names: {
                            name: string;
                        }[];
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
