FROM node AS base

WORKDIR /home/app

COPY ./package.json ./package.json

RUN yarn install

COPY . .

FROM base AS dev

RUN echo Dev

FROM base AS production

RUN yarn build





