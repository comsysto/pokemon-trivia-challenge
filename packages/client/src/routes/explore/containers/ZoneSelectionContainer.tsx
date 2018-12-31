import { IPanel } from "@blueprintjs/core";
import React from "react";
import { ZoneSelection, ZoneSelectionProps } from "../components/ZoneSelection";
import { WithExploreContext, withExploreContext } from "../contexts/ExploreContext";
import { RegionPanelContainer } from "./RegionPanelContainer";

type ZoneSelectionContainerBaseProps = WithExploreContext;

function ZoneSelectionContainerBase(props: ZoneSelectionContainerBaseProps) {
    const { exploreContext } = props;

    const initialPanel: IPanel = {
        title: "Region",
        component: RegionPanelContainer,
    };

    const onClose = () => {
        exploreContext.changeLocation();
    };

    const componentProps: ZoneSelectionProps = { initialPanel, onClose };
    return <ZoneSelection {...componentProps} />;
}

export const ZoneSelectionContainer = withExploreContext(ZoneSelectionContainerBase);
