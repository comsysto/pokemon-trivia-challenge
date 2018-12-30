import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

export const REGION_QUERY = gql`
    query Region($id: ID!) {
        region(id: $id) {
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
`;

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
    id: string;
};

export class RegionQuery extends Query<RegionQueryResponse, RegionQueryVariables> {
    public static defaultProps: Partial<QueryProps> = {
        query: REGION_QUERY,
    };
}
