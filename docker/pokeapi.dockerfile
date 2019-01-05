# Build Environment
FROM node:alpine as build-environment
ENV NODE_ENV development

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY packages/pokeapi/package.json yarn.lock ./
COPY packages/tsconfig.settings.json ./..
RUN yarn
COPY packages/pokeapi/ .
RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline

# Production Environment
FROM node:alpine as production-environment
ENV NODE_ENV production

RUN mkdir -p /home/node/app/node_modules/api-data
RUN chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY packages/pokeapi/package.json .
COPY --chown=node:node --from=build-environment /usr/src/app/build ./build
COPY --chown=node:node --from=build-environment /usr/src/app/node_modules ./node_modules

USER node
EXPOSE 7894

CMD [ "yarn", "start" ]
