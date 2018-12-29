import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

const query = gql`
    query {
        regions {
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

export type RegionsQueryResponse = {
    regions: {
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
    }[];
};

export class RegionsQuery extends Query<RegionsQueryResponse> {
    public static defaultProps: Partial<QueryProps> = {
        query,
    };
}
