FROM node:alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app

COPY packages/pokeapi/package.json .
COPY packages/tsconfig.settings.json ./..
COPY yarn.lock .
RUN yarn
COPY packages/pokeapi/ .
RUN yarn build

RUN chown -R node:node /home/node/app

USER node
EXPOSE 7894

CMD [ "yarn", "start" ]
