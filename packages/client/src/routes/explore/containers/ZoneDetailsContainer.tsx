import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { ExploreRouteParams } from "../../../Routes";

function ZoneDetailsContainerBase(props: RouteComponentProps<ExploreRouteParams>) {
    const {
        history,
        match: {
            params: { zoneName },
        },
    } = props;

    return <></>;
}

export const ZoneDetailsContainer = withRouter(ZoneDetailsContainerBase);
