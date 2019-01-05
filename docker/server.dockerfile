# Build Environment
FROM node:alpine as build-environment
ENV NODE_ENV development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY packages/server/package.json yarn.lock ./
COPY packages/tsconfig.settings.json ./..
RUN yarn
COPY packages/server/ .
RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline

# Production Environment
FROM node:alpine as production-environment
ENV NODE_ENV production

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY packages/server/package.json .
COPY --chown=node:node --from=build-environment /usr/src/app/build ./build
COPY --chown=node:node --from=build-environment /usr/src/app/node_modules ./node_modules

USER node
EXPOSE 4000

CMD [ "yarn", "start" ]
