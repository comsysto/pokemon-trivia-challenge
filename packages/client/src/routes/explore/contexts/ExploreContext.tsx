import React, { Component, createContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import * as Constants from "../../../app/constants";
import { ExploreRouteParams } from "../../../Routes";
import { createHoc } from "../../../utils";

type ExploreContextState = Readonly<{
    selectedRegion?: string;
    selectedZone?: string;
}>;

type ExploreContextActions = {
    changeLocation(selectedRegion?: string, selectedZone?: string): void;
};

export type ExploreContextProps = ExploreContextState & ExploreContextActions;

const { Consumer, Provider } = createContext<ExploreContextProps>({} as ExploreContextProps);

type ExploreContextProviderBaseProps = RouteComponentProps<ExploreRouteParams>;

class ExploreContextProviderBase extends Component<ExploreContextProviderBaseProps, ExploreContextState>
    implements ExploreContextActions {
    public readonly state: ExploreContextState = {};

    public componentDidMount() {
        const {
            match: { params },
        } = this.props;

        this.setState({ ...params });
    }

    public render() {
        const props: ExploreContextProps = {
            ...this.state,
            changeLocation: this.changeLocation,
        };

        return <Provider value={props}>{this.props.children}</Provider>;
    }

    public changeLocation = (selectedRegion?: string, selectedZone?: string) => {
        this.setState({ selectedRegion, selectedZone });
        const route = [selectedRegion, selectedZone].filter(Boolean).join("/");
        // Disallow trailing slash for consistency
        const separator = [route.length !== 0 && "/"].filter(Boolean).join("");
        this.props.history.push(`${Constants.ExploreRoute}${separator}${route}`);
    };
}

export const ExploreContextProvider = withRouter(ExploreContextProviderBase);

export type WithExploreContext = { exploreContext: ExploreContextProps };
export const withExploreContext = createHoc<WithExploreContext, ExploreContextProps>(Consumer, "exploreContext");
