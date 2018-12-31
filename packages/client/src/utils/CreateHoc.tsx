import React, { Component, ComponentType, ConsumerProps, ExoticComponent } from "react";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Optionalize<T extends K, K> = Omit<T, keyof K>;

export function createHoc<WithContext, ContextProps>(
    ContextConsumer: ExoticComponent<ConsumerProps<ContextProps>>,
    contextKey: keyof WithContext
) {
    return <P extends WithContext = WithContext>(WrappedComponent: ComponentType<P>) => {
        const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";
        const contextName = contextKey.toString().charAt(0).toUpperCase() + contextKey.toString().slice(1);

        return class extends Component<Optionalize<P, WithContext>> {
            public static displayName = `with${contextName}(${displayName})`;

            public render() {
                return (
                    <ContextConsumer>
                        {(context) => {
                            const props: P & WithContext = { ...(this.props as P), [contextKey]: context };
                            return <WrappedComponent {...props} />;
                        }}
                    </ContextConsumer>
                );
            }
        };
    };
}
