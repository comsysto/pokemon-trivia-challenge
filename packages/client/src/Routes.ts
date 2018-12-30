import { RouteProps } from "react-router";
import * as Constants from "./app/constants";
import { ExploreView } from "./routes/explore/views/ExploreView";
import { HomeView } from "./routes/home/views/HomeView";

export const appRoutes: RouteProps[] = [
    {
        path: Constants.HomeRoute,
        component: HomeView,
        exact: true,
    },
    {
        path: `${Constants.ExploreRoute}/:regionName?/:zoneName?`,
        component: ExploreView,
    },
];

export type ExplorationRouteParams = {
    regionName?: string;
    zoneName?: string;
};
