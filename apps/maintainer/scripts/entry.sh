#!/bin/sh

echo "Starting crontab"
crond start -l 8 && echo "Started crond"
echo "Waiting 10s..."
sleep 10
echo "Setting up certbot"
certbot certonly --webroot --webroot-path /usr/share/certbot --agree-tos -d $DOMAIN_NAME -n -m $EMAIL
#keep container alive
tail -f /dev/null
