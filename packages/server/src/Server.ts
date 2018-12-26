import { GraphQLServer } from "graphql-yoga";
import { Context } from "./api/SchemaTypes";
import { resolvers } from "./resolvers";

const context: Context = {};

const graphqlServer = new GraphQLServer({
    typeDefs: "./src/api/Schema.graphql",
    resolvers,
    context,
    // tslint:disable-next-line:no-any
} as any);

void graphqlServer.start(() => {
    console.log("🚀 GraphQL Server running on http://localhost:4000");
});
