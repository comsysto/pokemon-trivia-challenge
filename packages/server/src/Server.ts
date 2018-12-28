import { GraphQLServer } from "graphql-yoga";
import ProgressBar, { ProgressBarOptions } from "progress";
import { Context } from "./api/SchemaTypes";
import { NamedResourceListResponse } from "./data/PokeApiResponse";
import { resolvers } from "./resolvers";
import { fetchPokeApiByNamedUrl, fetchPokeApiByQuery, PokeApiEndpoint } from "./utils/PokeApiHelper";

(async () => {
    const context: Context = {};

    const graphqlServer = new GraphQLServer({
        typeDefs: "./src/api/Schema.graphql",
        resolvers,
        context,
        // tslint:disable-next-line:no-any
    } as any);

    const endpointsToCache: PokeApiEndpoint[] = [
        "language",
        "location",
        "location-area",
        "pokemon",
        "pokemon-species",
        "region",
    ];

    const apiEndpoints = (await Promise.all(
        endpointsToCache.map(async (endpoint) => {
            const { results } = await fetchPokeApiByQuery<NamedResourceListResponse<{}>>(endpoint);
            return results.map(({ url }) => url);
        })
    )).reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);

    const progressBar = new ProgressBar("[:bar] :current/:total", {
        clear: true,
        complete: "#",
        total: apiEndpoints.length,
        width: (process.stdout.columns || 40) - 12,
    } as ProgressBarOptions);

    while (!progressBar.complete) {
        await Promise.all(
            apiEndpoints.splice(0, 15).map(async (url) => {
                await fetchPokeApiByNamedUrl(url);
                progressBar.tick();
            })
        );
    }

    void graphqlServer.start(async () => {
        console.log("🚀 GraphQL Server running on http://localhost:4000");
    });
})();
