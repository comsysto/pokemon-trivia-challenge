import { ITreeNode, Tree } from "@blueprintjs/core";
import React from "react";

export type TreeNodeItem = ITreeNode<{ name: string }>;

export interface IZonePanelProps {
    contents: TreeNodeItem[];

    onNodeClick(node: TreeNodeItem): void;
}

export function ZonePanel(props: IZonePanelProps) {
    return <Tree {...props} />;
}
