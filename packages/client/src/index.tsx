import React from "react";
import ReactDOM from "react-dom";

import "normalize.css/normalize.css";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import "./index.scss";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import * as Constants from "./app/constants";
import { AppContainer } from "./app/containers/AppContainer";
import * as serviceWorker from "./serviceWorker";

const isDocker = () => process.env.REACT_APP_DOCKERENV === "true";

const httpLink = createHttpLink({
    // tslint:disable-next-line:no-http-string
    uri: `http://localhost:${Constants.GraphQLPort}`,
});

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <AppContainer />
    </ApolloProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
