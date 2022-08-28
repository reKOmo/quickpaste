#!/bin/sh

echo "Clearing pastes..."

curl "http://api/internalapi/pastes/clear-old"

echo "Done clearing"