import { GraphQLServer } from "graphql-yoga";
import { Props } from "graphql-yoga/dist/types";
import { GQLResolver } from "./schema";

const resolvers = {
    Query: {
        helloWorld: (_, {}) => "Hello, World from GraphQL :)",
    },
} as GQLResolver;

const graphqlServer = new GraphQLServer({
    typeDefs: "./schema.graphql",
    resolvers,
} as Props);

graphqlServer.start(() => console.log("🚀 GraphQL Server running on http://localhost:4000"));
