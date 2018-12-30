import { Card, IPanel, PanelStack } from "@blueprintjs/core";
import React from "react";
import Styles from "../styles/ZoneSelection.module.scss";

export interface IZoneSelectionProps {
    initialPanel: IPanel;

    onClose(): void;
}

export function ZoneSelection(props: IZoneSelectionProps) {
    return (
        <Card className={Styles.fullSize}>
            <PanelStack className={Styles.fullSize} {...props} />
        </Card>
    );
}
