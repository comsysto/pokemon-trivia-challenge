import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

export const REGIONS_QUERY = gql`
    query Regions {
        regions {
            id
            name
            names(languages: [EN]) {
                name
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
    }[];
};

export class RegionsQuery extends Query<RegionsQueryResponse> {
    public static defaultProps: Partial<QueryProps> = {
        query: REGIONS_QUERY,
    };
}
