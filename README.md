# Pokémon Trivia Challenge

> A small showcase on how to write a Node.js-based GraphQL server in TypeScript with a React client.

## Requirements

### Deployment only

* **Docker** - used to deploy production builds either locally or remotely

### Development

* **Node 10+** - self-explanatory
* **yarn** - this is a monorepo that initially leveraged the features of lerna, but has been taught to use yarn workspaces for efficient hoisting of packages.

## Deployment via Docker

If you want to deploy the application in production mode without developing anything new, you don't even need to `yarn install` anything since you can just follow these steps:

### Starting

1. Run `docker-compose up` in your terminal
2. Get a cup of tea or coffee and give Docker a few minutes to build the containers
3. Once the server reports `🚀 GraphQL Server running on http://localhost:4000` in the terminal you can navigate to your host at port **5000** and start playing the game

### Stopping

1. Ctrl+C to attempt a graceful stop the process
2. Run `docker-compose down`
3. Follow up with `yarn docker:prune` to to remove the built images in order to free up some space as well as dangling references

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

## Debugging and Ports

* **PokéAPI** - the PokéAPI is being served using `express` and is available at port **7894** via http://localhost:7894/api/v2/
* **GraphQL Server** - the GraphQL server is served at port **4000** via the `/` endpoint and you can access the playground at http://localhost:4000 and explore the schema
* **React Client** - the React client is being served using `serve` and is available at port **5000** via http://localhost:5000

## Security

Please keep in mind that the Docker containers, especially the Redis instance, are not secured at all. Running them in production environments without a proper setup using an actual password and blocking ports will make you vulnerabled. This configuration can allow attackers to gain local access to your machine, as well as the ability to read, change, or destroy any data hosted in your Redis instance. This issue could result in severe security breaches, and we strongly urge you to take immediate action to secure the Redis instance for production environments.

## Architecture

### **PokéAPI REST API**

This is a custom instance of the data hosted over at https://pokeapi.co/ in raw JSON. We fake a REST API accessible via the `/api/v2` route which basically is just serving the static JSON files using `express`. This was necessary since the official PokéAPI limits the amount of requests.

### **GraphQL Server**

The GraphQL server based on the `graphql-yoga` package. It represents a facade in front of the PokéAPI and the Open Trivia Database API. For the former it is mainly responsible to rewrite the JSON responses and follow any so called `NamedApiResource` in the response which allows navigation through the entirety of the PokéAPI.

In order to alleviate strain on the filesystem induced by constant queries, the GraphQL server caches all responses in a Redis store. Furthermore the server is prefetching the most accessed endpoints and storing them in Redis right away.

### **React Client**

For this application the current implementation of the frontend is using React and leverages the capabilities of Apollo as a GraphQL client instead of Relay. We make use of the caching capabilities of Apollo, even though sometimes this can be really tricky to handle.

#### State Management

Redux for such a small project is pretty much overkill and annoying to set up in the first place. Passing down props through four children, just to share the state was not feasible either. This project leverages the React contexts to share state and actions across multiple components.

## Features

- [x] Exploration mode
    - [x] Region list
    - [x] Zone list
    - [x] Zone details
    - [x] Quiz
        - [x] Random encounter selection
        - [x] Question difficulty selection
        - [x] Question and answer handling
        - [x] Storing caught Pokémon in collection (Pokédex) - **currently only via `localStorage`!**
- [ ] Trial mode
- [ ] Persistence
    - [ ] Users
    - [x] Pokémon collection (Pokédex)
