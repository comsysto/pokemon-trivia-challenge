import { GraphQLServer } from "graphql-yoga";
import { Context } from "./api/SchemaTypes";
import * as Constants from "./constants";
import { resolvers } from "./resolvers";
import { prefetchPokeApi } from "./utils/Prefetch";

(async () => {
    await prefetchPokeApi();

    const graphqlServer = new GraphQLServer({
        typeDefs: "./src/api/Schema.graphql",
        resolvers,
        context: {} as Context,
        // tslint:disable-next-line:no-any
    } as any);

    void graphqlServer.start(
        {
            port: Constants.GraphQLServerPort,
        },
        async () => {
            console.log(`🚀 GraphQL Server running on http://localhost:${Constants.GraphQLServerPort}`);
        }
    );
})();
