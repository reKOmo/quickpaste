FROM node:22.14-alpine3.20 AS base

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

# PRODUCTION
FROM base AS production

COPY ./build ./build
COPY ./.yalc ./.yalc
RUN npm install --only=prod