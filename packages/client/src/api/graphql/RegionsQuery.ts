import { DocumentNode } from "graphql";
import gql from "graphql-tag";
import { Query, QueryProps } from "react-apollo";

export const RegionsQueryString = gql`
    query Regions {
        regions {
            id
            name
            names(languages: [EN]) {
                name
            }
        }
    }
` as DocumentNode;

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
        query: RegionsQueryString,
    };
}
