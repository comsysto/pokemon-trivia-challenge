import { RouteProps } from "react-router";
import * as Constants from "./app/constants";
import { ExploreView } from "./routes/explore/views/ExploreView";
import { HomeView } from "./routes/home/views/HomeView";
import { QuizView } from "./routes/quiz/views/QuizView";

export const appRoutes: RouteProps[] = [
    {
        path: Constants.HomeRoute,
        component: HomeView,
        exact: true,
    },
    {
        path: `${Constants.ExploreRoute}/:selectedRegion?/:selectedZone?`,
        component: ExploreView,
    },
    {
        path: `${Constants.QuizRoute}/:selectedRegion?/:selectedZone?`,
        component: QuizView,
    },
];

export type ExploreRouteParams = {
    selectedRegion?: string;
    selectedZone?: string;
};

export type QuizRouteParams = {
    selectedRegion?: string;
    selectedZone?: string;
};
