import { GraphQLServer } from "graphql-yoga";
import { Context } from "./api/SchemaTypes";
import { resolvers } from "./resolvers";
import { prefetchPokeApi } from "./utils/Prefetch";
import * as Constants from "./constants";

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
            port: Constants.graphqlServerPort,
        },
        async () => {
            console.log(`🚀 GraphQL Server running on http://localhost:${Constants.graphqlServerPort}`);
        }
    );
})();
