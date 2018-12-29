import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

const query = gql`
    query LocationQuery($id: ID!) {
        location(id: $id) {
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
    id: string;
};

export class LocationQuery extends Query<LocationQueryResponse, LocationQueryVariables> {
    public static defaultProps: Partial<QueryProps> = {
        query,
    };
}
