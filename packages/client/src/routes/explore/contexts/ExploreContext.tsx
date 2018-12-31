import React, { Component, createContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import * as Constants from "../../../app/constants";
import { ExploreRouteParams } from "../../../Routes";
import { createHoc } from "../../../utils";

interface IExploreContextState {
    readonly selectedRegion?: string;
    readonly selectedZone?: string;
}

interface IExploreContextActions {
    changeLocation(selectedRegion?: string, selectedZone?: string): void;
}

export type IExploreContextProps = IExploreContextState & IExploreContextActions;

const { Consumer, Provider } = createContext<IExploreContextProps>({} as IExploreContextProps);

class ExploreContextProviderBase extends Component<RouteComponentProps<ExploreRouteParams>, IExploreContextState>
    implements IExploreContextActions {
    public readonly state: IExploreContextState = {};

    public componentDidMount() {
        const {
            match: { params },
        } = this.props;

        this.setState({ ...params });
    }

    public render() {
        const props: IExploreContextProps = {
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

export type WithExploreContext = { exploreContext: IExploreContextProps };
export const withExploreContext = createHoc<WithExploreContext, IExploreContextProps>(Consumer, "exploreContext");
