FROM localstack/localstack

# Add the scripts to the Docker Image
COPY ./scripts /etc/localstack/init

RUN chmod +x /etc/localstack/init/ready.d/create_bucket.sh