import { DocumentNode } from "graphql";
import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

export const RegionQueryString = gql`
    query Region($name: ID!) {
        region(name: $name) {
            id
            name
            names(languages: [EN]) {
                name
            }
            locations {
                id
                name
                names(languages: [EN]) {
                    name
                }
            }
        }
    }
` as DocumentNode;

export type RegionQueryResponse = {
    region: {
        id: string;
        name: string;
        names: {
            name: string;
        }[];
        locations: {
            id: string;
            name: string;
            names: {
                name: string;
            }[];
        }[];
    };
};

export type RegionQueryVariables = {
    name: string;
};

export class RegionQuery extends Query<RegionQueryResponse, RegionQueryVariables> {
    public static defaultProps: Partial<QueryProps> = {
        query: RegionQueryString,
    };
}
