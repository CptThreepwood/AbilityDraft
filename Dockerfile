FROM node:current-alpine3.12

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn build

CMD ["node","./build/scrapeMatchHistory.js"]