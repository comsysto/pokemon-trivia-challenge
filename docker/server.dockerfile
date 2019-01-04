FROM node:alpine

RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app

COPY packages/server/ .
COPY packages/tsconfig.settings.json ./..
COPY yarn.lock .
RUN yarn
RUN yarn build

RUN chown -R node:node /home/node/app

USER node
EXPOSE 4000

CMD [ "yarn", "start" ]
