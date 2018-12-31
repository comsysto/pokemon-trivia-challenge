import { Card, IPanel, PanelStack } from "@blueprintjs/core";
import React from "react";
import Styles from "../styles/ZoneSelection.module.scss";

export type ZoneSelectionProps = {
    initialPanel: IPanel;

    onClose(): void;
};

export function ZoneSelection(props: ZoneSelectionProps) {
    return (
        <Card className={Styles.fullSize}>
            <PanelStack className={Styles.fullSize} {...props} />
        </Card>
    );
}
