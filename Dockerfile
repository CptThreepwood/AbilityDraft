FROM node:current-alpine3.12

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn build

ENTRYPOINT [node './build/serve.js']