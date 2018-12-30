import { IPanel } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import * as Constants from "../../../app/constants";
import { IZoneSelectionProps, ZoneSelection } from "../components/ZoneSelection";
import { IRegionPanelContainerProps, RegionPanelContainer } from "./RegionPanelContainer";

export interface IZoneSelectionContainerProps {
    updateZoneDetails(): void;
}

function ZoneSelectionContainerBase(props: IZoneSelectionContainerProps & RouteComponentProps) {
    const { history, updateZoneDetails } = props;

    const initialPanel: IPanel<IRegionPanelContainerProps> = {
        title: "Region",
        component: RegionPanelContainer,
        props: {
            updateZoneDetails,
        },
    };

    const onClose = () => {
        history.push(Constants.ExploreRoute);
        updateZoneDetails();
    };

    const componentProps: IZoneSelectionProps = { initialPanel: (initialPanel as unknown) as IPanel, onClose };
    return <ZoneSelection {...componentProps} />;
}

export const ZoneSelectionContainer = withRouter(ZoneSelectionContainerBase);
