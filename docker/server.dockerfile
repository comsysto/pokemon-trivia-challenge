FROM node:alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

ENV DOCKER true
COPY packages/server/ .
COPY packages/tsconfig.settings.json ./..
RUN yarn
RUN yarn build

USER node
EXPOSE 4000

CMD [ "yarn", "start" ]
