import { ITreeNode, NonIdealState, Spinner, Tree } from "@blueprintjs/core";
import React from "react";

export type TreeNodeItem = ITreeNode<{ name: string }>;

export type LocationPanelProps = {
    contents: TreeNodeItem[];
    hasError: boolean;
    isLoading: boolean;

    onNodeClick(node: TreeNodeItem): void;
};

export function LocationPanel(props: LocationPanelProps) {
    const { hasError, isLoading, contents } = props;

    return (
        <>
            {isLoading && <NonIdealState icon={<Spinner />} />}
            {hasError && (
                <NonIdealState
                    icon="warning-sign"
                    title="Failed to load items"
                    description="An exception has occurred while fetching the data. Please try again later."
                />
            )}
            {!isLoading &&
                !hasError &&
                (contents.length === 0 ? (
                    <NonIdealState
                        icon="info-sign"
                        title="No items available"
                        description="There are no areas available for the currently selected location."
                    />
                ) : (
                    <Tree {...props} />
                ))}
        </>
    );
}
