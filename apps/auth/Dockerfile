FROM node:18-alpine3.15 AS base

RUN npm i -g yalc
RUN npm i -g workspace-to-yalc

WORKDIR /home/app

COPY ./.eslintrc.js ./.eslintrc.js
COPY ./tsconfig.json ./tsconfig.json
COPY ./package.json ./package.json

#resolve local packages
RUN workspace-to-yalc --file

COPY ./src ./src

# DEV
FROM base AS dev

RUN npm install

# PRODUCTION
FROM base AS production

RUN npm install --only=prod
RUN npm run build