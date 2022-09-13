#!/bin/sh

echo "Starting crontab"
crond start -l 8 && echo "Started crond"
echo "Setting up certbot"
sleep 20
certbot certonly --nginx --agree-tos -d $DOMAIN_NAME -d www.$DOMAIN_NAME -n -m $EMAIL