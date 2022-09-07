FROM nginx:1.21.6-alpine AS base


FROM base AS dev
COPY ./nginx.dev.conf /etc/nginx/nginx.conf

FROM base AS production
COPY ./nginx.conf /etc/nginx/nginx.conf.tempate
RUN envsubst '${DOMAIN_NAME}' < /etc/nginx/nginx.conf.tempate > /etc/nginx/nginx.conf