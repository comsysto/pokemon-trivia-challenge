import { RouteProps } from "react-router";
import * as Constants from "./common/constants";
import { ExploreView } from "./explore/views/ExploreView";
import { HomeView } from "./home/views/HomeView";

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
