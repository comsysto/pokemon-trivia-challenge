import { IResolvers } from "graphql-middleware/dist/types";
import { GraphQLServer } from "graphql-yoga";

const resolvers = {
    Query: {
        helloWorld: () => "Hello, World from GraphQL :)",
    },
};

const graphqlServer = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: resolvers as IResolvers<any, any>,
});

graphqlServer.start(() => console.log("🚀 GraphQL Server running on http://localhost:4000"));
