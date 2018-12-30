import { IPanel } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import * as Constants from "../../../common/constants";
import { IZoneSelectionProps, ZoneSelection } from "../components/ZoneSelection";
import { ZonePanelContainer } from "./ZonePanelContainer";

function ZoneSelectionContainerBase(props: RouteComponentProps) {
    const { history } = props;

    const initialPanel: IPanel = {
        title: "Region",
        component: ZonePanelContainer,
    };

    const onClose = () => history.push(Constants.ExploreRoute);

    const componentProps: IZoneSelectionProps = { initialPanel, onClose };
    return <ZoneSelection {...componentProps} />;
}

export const ZoneSelectionContainer = withRouter(ZoneSelectionContainerBase);
