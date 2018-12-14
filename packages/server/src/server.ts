import { GraphQLServer } from "graphql-yoga";
import { Props } from "graphql-yoga/dist/types";
import openTriviaDBApiResolvers from "./resolvers/OpenTriviaDBApiResolvers";
import { GQLResolver } from "./schema";

const resolvers: GQLResolver = {
    ...openTriviaDBApiResolvers,
};

const graphqlServer = new GraphQLServer({
    typeDefs: "./schema.graphql",
    resolvers,
} as Props);

graphqlServer.start(() => console.log("🚀 GraphQL Server running on http://localhost:4000"));
