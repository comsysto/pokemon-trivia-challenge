import classNames from "classnames";
import React, { Component } from "react";
import shortid from "shortid";
import { ZoneDetailsContainer } from "../containers/ZoneDetailsContainer";
import { ZoneSelectionContainer } from "../containers/ZoneSelectionContainer";
import Styles from "../styles/ExploreView.module.scss";

interface IExploreViewState {
    key?: string;
}

export class ExploreView extends Component<{}, IExploreViewState> {
    public readonly state: IExploreViewState = {};

    public render() {
        return (
            <div className={Styles.viewContainer}>
                <div className={classNames(Styles.column, Styles.sidebar)}>
                    <ZoneSelectionContainer updateZoneDetails={this.updateZoneDetails} />
                </div>
                <div className={classNames(Styles.column, Styles.content)}>
                    <ZoneDetailsContainer key={this.state.key} />
                </div>
            </div>
        );
    }

    // This is a temporary bandaid fix to allow updating the ZoneDetailsContainer and its children when the user opens
    // a different location. We are sending this prop down to the third descendent (EV -> ZSC -> RPC -> ZPC) which is
    // super sketchy but works for the time being.
    // A proper fix to prevent such nonsensical patterns is the implementation of proper state management via Redux or
    // MobX, however for this small pet project it is pretty much overkill at the time of writing this and categorized
    // as nice-to-have instead of must-have.
    // Another downside of this method is that the ZoneDetailsContainer is not updated but recreated entirely! Further-
    // more the call to onClose when browsing back to the region list is bound to this method as well, which is ugly.
    private updateZoneDetails = () => {
        this.setState({ key: shortid.generate() });
    };
}
