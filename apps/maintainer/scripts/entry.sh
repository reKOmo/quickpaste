#!/bin/sh

echo "starting crontab"
crond -f -l 8
echo "setting up certbot"
certbot certonly --nginx --agree-tos -d $DOMAIN_NAME -d www.$DOMAIN_NAME -n -m $EMAIL