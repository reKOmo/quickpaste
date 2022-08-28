FROM alpine:3.14

RUN apk add --no-cache curl

# Add the scripts to the Docker Image
ADD ./scripts /scripts
ADD ./crontab.txt /crontab.txt

# Give execution rights on the cron scripts
RUN chmod 0644 /scripts/clear-pastes.sh

# Add the cron job
RUN crontab ./crontab.txt

#start cron
CMD ["crond", "-f", "-l", "8"]