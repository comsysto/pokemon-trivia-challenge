import { GraphQLServer } from "graphql-yoga";
import { Context } from "./api/SchemaTypes";
import { NamedResourceListResponse } from "./data/PokeApiResponse";
import { resolvers } from "./resolvers";
import { fetchPokeApiByNamedUrl, fetchPokeApiByQuery, PokeApiEndpoint } from "./utils/PokeApiHelper";

const context: Context = {};

const graphqlServer = new GraphQLServer({
    typeDefs: "./src/api/Schema.graphql",
    resolvers,
    context,
    // tslint:disable-next-line:no-any
} as any);

// Prefetch cache
async function fetchPokeApiNamedResourceList<ResponseType>(endpoint: PokeApiEndpoint) {
    const { results } = await fetchPokeApiByQuery<NamedResourceListResponse<ResponseType[]>>(endpoint);
    for (const result of results) {
        await fetchPokeApiByNamedUrl(result.url);
    }
}

const endpointsToPrefetch: PokeApiEndpoint[] = [
    "language",
    "location",
    "location-area",
    "pokemon",
    "pokemon-species",
    "region",
];

Promise.all(endpointsToPrefetch.map(async (endpoint) => fetchPokeApiNamedResourceList(endpoint))).then(() => {
    void graphqlServer.start(async () => {
        console.log("🚀 GraphQL Server running on http://localhost:4000");
    });
});
