# Pokémon Trivia Challenge

> A small showcase on how to write a Node.js-based GraphQL server in TypeScript with a React client.

## Deployment via Docker

1. Run `docker-compose up` in your terminal
2. Get a cup of tea or coffee and give Docker a few minutes to build the containers
3. Once the server reports `🚀 GraphQL Server running on http://localhost:4000` in the terminal you can navigate to http://localhost:5000 (**mind the port!**) and play the game

To stop the containers gracefully Ctrl+C and run `docker-compose down` in your terminal and follow up with `yarn docker:prune` to remove the built images in order to free up some space.

## Local development

This method runs all servers and the client in debug mode without production settings.

### Starting

1. Run `yarn dev:redis` to boot up the Redis cache used by the GraphQL server
2. Run `yarn dev:pokeapi` to boot up the PokeAPI REST API
3. Run `yarn dev:server` in a separate terminal to boot up the GraphQL server
4. Run `yarn dev:client` in a separate terminal to boot up the React client in the browser

### Stopping

1. Just Ctrl+C the `pokeapi`, `server` and `client` processes
2. Shutdown Redis by running `yarn stop:redis`
