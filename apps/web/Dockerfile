FROM node:18-alpine3.15 AS base

RUN npm i -g yalc
RUN npm i -g workspace-to-yalc

WORKDIR /home/app

COPY ./tsconfig.json ./tsconfig.json
COPY ./windi.config.ts ./windi.config.ts
COPY ./nuxt.config.ts ./nuxt.config.ts
COPY ./package.json ./package.json

#resolve local packages
RUN workspace-to-yalc --file

COPY ./src ./src

# FROM base AS dev

# RUN echo Dev

FROM base AS production
COPY ./.yalc ./.yalc
RUN yarn install
RUN yarn run build
