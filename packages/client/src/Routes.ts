import { RouteProps } from "react-router";
import * as Constants from "./common/constants";
import { HomeView } from "./home/views/HomeView";
import { ExplorationView } from "./views/Exploration";

export const appRoutes: RouteProps[] = [
    {
        path: Constants.HomeRoute,
        component: HomeView,
        exact: true,
    },
    {
        path: `${Constants.ExploreRoute}/:regionName?/:zoneName?`,
        component: ExplorationView,
    },
];

export type ExplorationRouteParams = {
    regionName?: string;
    zoneName?: string;
};
