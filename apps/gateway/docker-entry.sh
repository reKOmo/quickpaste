#!/bin/sh

envsubst '${DOMAIN_NAME}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
sh -c "/usr/local/scripts/auto-reload.sh &"
ls /etc/ssl
exec "$@"