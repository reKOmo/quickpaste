#!/bin/sh

while true
do
    inotifywait -e create -e modify -r /etc/letsencrypt/live/$DOMAIN_NAME
    echo "New SSL certificates dected"
    echo "Reloading nginx"
    service nginx reload
done