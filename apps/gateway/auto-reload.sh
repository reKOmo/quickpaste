#!/bin/sh

while true
do
    inotifywait -e create -e modify -r /etc/ssl
    echo "New SSL certificates dected"
    echo "Reloading nginx"
    nginx -s reload
done