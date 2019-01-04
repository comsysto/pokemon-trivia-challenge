import ProgressBar, { ProgressBarOptions } from "progress";
import { NamedResourceListResponse } from "../data/PokeApiResponse";
import { fetchPokeApiByNamedUrl, fetchPokeApiByQuery, PokeApiEndpoint } from "./PokeApiHelper";

export async function prefetchPokeApi() {
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
        width: (process.stdout.columns || 40) - 14,
    } as ProgressBarOptions);

    while (!progressBar.complete) {
        await Promise.all(
            apiEndpoints.splice(0, 10).map(async (url) => {
                await fetchPokeApiByNamedUrl(url);
                progressBar.tick();
            })
        );
    }
}
