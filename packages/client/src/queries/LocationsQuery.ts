import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

const query = gql`
    query {
        locations {
            id
            name
            names(languages: [EN]) {
                name
            }
            areas {
                name
            }
        }
    }
`;

export type LocationsQueryResponse = {
    locations: {
        id: string;
        name: string;
        names: {
            name: string;
        }[];
        areas: {
            name: string;
        }[];
    }[];
};

export class LocationsQuery extends Query<LocationsQueryResponse> {
    public static defaultProps: Partial<QueryProps> = {
        query,
    };
}
