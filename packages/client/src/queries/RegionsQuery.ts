import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

const query = gql`
    query {
        regions {
            id
            names(languages: [EN]) {
                name
            }
            locations {
                id
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
        names: {
            name: string;
        }[];
        locations: {
            id: string;
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
