FROM node:22.14-alpine3.20 AS base

RUN npm i -g yalc
RUN npm i -g workspace-to-yalc

COPY ./tsconfig.json ./tsconfig.json
COPY ./windi.config.ts ./windi.config.ts
COPY ./nuxt.config.ts ./nuxt.config.ts
COPY ./package.json ./package.json

FROM base AS production
COPY ./.yalc ./.yalc
COPY ./.output ./.output
RUN npm install --only=prod