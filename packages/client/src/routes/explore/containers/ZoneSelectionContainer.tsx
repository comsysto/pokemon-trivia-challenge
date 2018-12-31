import { IPanel } from "@blueprintjs/core";
import React from "react";
import { IZoneSelectionProps, ZoneSelection } from "../components/ZoneSelection";
import { WithExploreContext, withExploreContext } from "../contexts/ExploreContext";
import { RegionPanelContainer } from "./RegionPanelContainer";

function ZoneSelectionContainerBase(props: WithExploreContext) {
    const { exploreContext } = props;

    const initialPanel: IPanel = {
        title: "Region",
        component: RegionPanelContainer,
    };

    const onClose = () => {
        exploreContext.changeLocation();
    };

    const componentProps: IZoneSelectionProps = { initialPanel, onClose };
    return <ZoneSelection {...componentProps} />;
}

export const ZoneSelectionContainer = withExploreContext(ZoneSelectionContainerBase);
