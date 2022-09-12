FROM node:18-alpine3.15 AS base

RUN npm i -g yalc
RUN npm i -g workspace-to-yalc

WORKDIR /home/app

COPY ./.eslintrc.js ./.eslintrc.js
COPY ./tsconfig.json ./tsconfig.json
COPY ./package.json ./package.json


# DEV
FROM base AS dev

#resolve local packages
COPY ./src ./src
RUN workspace-to-yalc --file
RUN npm install

# PRODUCTION - pre compiled
FROM base AS production

COPY ./build ./build
COPY ./.yalc ./.yalc
RUN npm install --only=prod