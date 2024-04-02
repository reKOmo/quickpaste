FROM python:3.9.14-alpine

RUN apk add --no-cache curl

# Add the scripts to the Docker Image
COPY ./scripts /scripts
COPY ./crontab.txt /crontab.txt

# Give execution rights on the cron scripts
RUN chmod +x /scripts/*
# setup certbot
RUN mkdir /etc/letsencrypt
#RUN apk add --no-cache certbot
#RUN apk add --no-cache certbot-nginx

# Add the cron job
RUN crontab ./crontab.txt

#start cron
ENTRYPOINT [ "/scripts/entry.sh" ]