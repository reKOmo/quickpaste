#!/bin/sh

crond -f -l 8
certbot certonly --nginx --agree-tos -d $DOMAIN_NAME -d www.$DOMAIN_NAME -n -m $EMAIL