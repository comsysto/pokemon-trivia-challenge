import { RouteProps } from "react-router";
import { ExplorationView } from "./views/Exploration";
import { GameModeView } from "./views/GameMode";
import { QuizView } from "./views/Quiz";

export const appRoutes: RouteProps[] = [
    {
        path: "/",
        component: GameModeView,
        exact: true,
    },
    {
        path: "/exploration/:regionName?/:zoneName?",
        component: ExplorationView,
    },
    {
        path: "/quiz",
        component: QuizView,
    },
];

export type ExplorationRouteParams = {
    regionName?: string;
    zoneName?: string;
};
