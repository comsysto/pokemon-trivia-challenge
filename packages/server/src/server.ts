import { IResolvers } from "graphql-tools";
import { GraphQLServer } from "graphql-yoga";
import { Props } from "graphql-yoga/dist/types";
import { openTriviaDBApiResolvers } from "./resolvers/OpenTriviaDBApiResolvers";
import { GQLResolver } from "./schema";

const resolvers: GQLResolver = {
    ...openTriviaDBApiResolvers,
};

const graphqlServerProps: Props = {
    typeDefs: "./schema.graphql",
    resolvers: resolvers as IResolvers,
};
const graphqlServer = new GraphQLServer(graphqlServerProps);

void graphqlServer.start(() => {
    console.log("🚀 GraphQL Server running on http://localhost:4000");
});
