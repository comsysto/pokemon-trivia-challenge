import { IPanel } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import * as Constants from "../../../app/constants";
import { IZoneSelectionProps, ZoneSelection } from "../components/ZoneSelection";
import { RegionPanelContainer } from "./RegionPanelContainer";

function ZoneSelectionContainerBase(props: RouteComponentProps) {
    const { history } = props;

    const initialPanel: IPanel = {
        title: "Region",
        component: RegionPanelContainer,
    };

    const onClose = () => {
        history.push(Constants.ExploreRoute);
    };

    const componentProps: IZoneSelectionProps = { initialPanel: (initialPanel as unknown) as IPanel, onClose };
    return <ZoneSelection {...componentProps} />;
}

export const ZoneSelectionContainer = withRouter(ZoneSelectionContainerBase);
