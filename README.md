# Pokémon Trivia Challenge

> A small showcase on how to write a Node.js-based GraphQL server in TypeScript with a React client.

## Requirements

* **Node 10+** - self-explanatory
* **yarn** - this is a monorepo that initially leveraged the features of lerna, but has been taught to use yarn workspaces for efficient hoisting of packages.
* **Docker** - used to deploy production builds either locally or remotely

## Deployment via Docker

If you want to deploy the application in production mode without developing anything new, you don't even need to `yarn install` anything since you can just follow these steps:

1. Run `docker-compose up` in your terminal
2. Get a cup of tea or coffee and give Docker a few minutes to build the containers
3. Once the server reports `🚀 GraphQL Server running on http://localhost:4000` in the terminal you can navigate to http://localhost:5000 (**mind the port!**) and play the game

To stop the containers gracefully Ctrl+C and run `docker-compose down` in your terminal and optionally follow up with `yarn docker:prune` to remove the built images in order to free up some space.

## Local development

This method runs all servers and the client in debug mode without production settings. Make sure to `yarn install` in the root directory once you cloned the repository in order to setup the workspaces link dependencies accordingly.

### Starting

1. Run `yarn dev:redis` to boot up the Redis cache used by the GraphQL server
2. Run `yarn dev:pokeapi` to boot up the PokeAPI REST API
3. Run `yarn dev:server` in a separate terminal to boot up the GraphQL server
4. Run `yarn dev:client` in a separate terminal to boot up the React client in the browser

### Stopping

1. Just Ctrl+C the `pokeapi`, `server` and `client` processes
2. Shutdown Redis by running `yarn stop:redis`

## Architecture

### **PokéAPI REST API**

This is a custom instance of the data hosted over at https://pokeapi.co/ in raw JSON. We fake a REST API accessible via the `/api/v2` route which basically is just serving the static JSON files using `express`. This was necessary since the official PokéAPI limits the amount of requests.

### **GraphQL Server**

The GraphQL server based on the `graphql-yoga` package. It represents a facade in front of the PokéAPI and the Open Trivia Database API. For the former it is mainly responsible to rewrite the JSON responses and follow any so called `NamedApiResource` in the response which allows navigation through the entirety of the PokéAPI.

In order to alleviate strain on the filesystem induced by constant queries, the GraphQL server caches all responses in a Redis store. Furthermore the server is prefetching the most accessed endpoints and storing them in Redis right away.

### **React Client**

For this application the current implementation of the frontend is using React and leverages the capabilities of Apollo as a GraphQL client instead of Relay. We make use of the caching capabilities of Apollo, even though sometimes this can be really tricky to handle.

## Features

- [ ] Exploration mode
    - [x] Region list
    - [x] Zone list
    - [x] Zone details
    - [ ] Quiz
        - [x] Random encounter selection
        - [x] Question difficulty selection
        - [x] Question and answer handling
        - [ ] Storing caught Pokémon in collection (Pokédex) (see also: *Persistence*)
- [ ] Trial mode
- [ ] Persistence
    - [ ] Users
    - [ ] Pokémon collection (Pokédex)
