import { IPanelProps } from "@blueprintjs/core";
import React from "react";
import { IZonePanelProps, TreeNodeItem, ZonePanel } from "../components/ZonePanel";

export interface IZonePanelContainerProps {
    regionName?: string;
}

export function ZonePanelContainer(props: IPanelProps & IZonePanelContainerProps) {
    const onNodeClick = (node: TreeNodeItem) => props.openPanel<IZonePanelContainerProps>({
        title: `Zone`,
        component: ZonePanelContainer,
        props: {
            // tslint:disable-next-line:no-non-null-assertion
            regionName: node.nodeData!.name,
        },
    });

    // tslint:disable-next-line:prefer-array-literal
    const treeNodes: TreeNodeItem[] = [...Array(32)].map((_, index): TreeNodeItem => ({
        id: index,
        label: `${index}`,
        icon: "globe",
        nodeData: {
            name: `${index}`,
        }
    }));

    const componentProps: IZonePanelProps = { contents: treeNodes, onNodeClick };
    return <ZonePanel {...componentProps} />;
}
