FROM node:alpine

RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app

COPY packages/client/ .
COPY packages/tsconfig.settings.json ./..
COPY yarn.lock .
RUN yarn
RUN yarn build

RUN chown -R node:node /home/node/app

USER node
EXPOSE 5000

CMD [ "yarn", "serve" ]
