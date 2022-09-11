FROM nginx:1.21.6-alpine AS base


FROM base AS dev
COPY ./nginx.dev.conf /etc/nginx/nginx.conf

FROM base AS production
# add inotify-tools for sll auto reloading
RUN apk add --no-cache inotify-tools
# modify nginx config with env varibles
COPY ./nginx.conf /etc/nginx/nginx.conf.template

RUN mkdir /usr/local/scripts
COPY ./auto-reload.sh /usr/local/scripts/auto-reload.sh
COPY ./docker-entry.sh /usr/local/scripts/dokcer-entry.sh
RUN chmod +x /usr/local/scripts/auto-reload.sh
RUN chmod +x /usr/local/scripts/dokcer-entry.sh

ENTRYPOINT [ "/usr/local/scripts/dokcer-entry.sh" ]
CMD ["nginx", "-g", "daemon off;"]