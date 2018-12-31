import React, { Component, createContext } from "react";
import { createHoc } from "../../../utils";

interface IExploreContextState {
    selectedRegion?: string;
    selectedZone?: string;
}

interface IExploreContextActions {
    doSomething(): void;
}

export type IExploreContextProps = IExploreContextState & IExploreContextActions;

const { Consumer, Provider } = createContext<IExploreContextProps>({} as IExploreContextProps);

export class ExploreContextProvider extends Component<{}, IExploreContextState> {
    public readonly state: IExploreContextState = {};

    public render() {
        const props: IExploreContextProps = {
            ...this.state,
            doSomething: this.doSomething,
        };

        return <Provider value={props}>{this.props.children}</Provider>;
    }

    private doSomething = () => {
        console.log("Yay!");
    };
}

export type WithExploreContext = { exploreContext: IExploreContextProps };
export const withExploreContext = createHoc<WithExploreContext, IExploreContextProps>(
    Consumer,
    "exploreContext"
);
