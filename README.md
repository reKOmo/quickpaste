
Demo application providing a service for easy sharing text/code snippets.

  

Technologies used:

Node JS + TypeScript

Express.js

Nuxt 3 + Vue 3 + Windicss

PostgreSQL

Docker (microservice architecture)

AWS: S3, EC2, Codedeploy

Turborepo + pnpm workspaces

JWT, Github OAuth

Linux

  


# Project setup

Before startring to work with the project setting env varibles is required

>  Note: *fill empty varibles with own values*

  
<details>
  <summary>`apps/api/dev.env`</summary>

  ```
  AWS_ACCESS_KEY_ID=
  AWS_SECRET_ACCESS_KEY="secretDEVkey"
  AWS_BUCKET_NAME="quickpaste"
  AWS_REGION="eu-north-1"
  AWS_ENDPOINT="http://storage:4566"

  PG_HOST="db"
  PG_PORT="5432"
  PG_DB_NAME="quickpaste"

  ```
</details>
<details>
  <summary>`apps/auth/dev.env`</summary>
  
  ```
  JWT_SECRET_KEY=
  PG_HOST="db"
  PG_PORT="5432"
  PG_DB_NAME="quickpaste"
  ```
</details>
<details>
  <summary>`apps/web/dev.env`</summary>

  ```
  NUXT_HOST=0
  NUXT_PORT=3000

  # no '/' at the ends of links
  INTERNAL_GATEWAY_ADDRESS="http://localhost:8080"
  INTERNAL_API_ADDRESS="http://localhost:4000"
  AUTH_SERVICE_ADDRESS="http://localhost:4001"
  WEB_ADDRESS="http://localhost:8080"

  GITHUB_CLIENT_ID=
  GITHUB_CLIENT_SECRET=

  # https://docs.hcaptcha.com/#integration-testing-test-keys
  HCAPTCHA_SITEKEY="10000000-ffff-ffff-ffff-000000000001"
  ```
</details>
<details>
  <summary>`dev.env`</summary>

  ```
  # local folders
  LOCAL_DEV_STORAGE="./.dev_storage/localstack_data"
  LOCAL_DEV_DB="./.dev_storage/postgress_data"

  # exposed ports on to local machine, if changed also change ports in web configuration
  API_PORT=4000
  AUTH_PORT=4001
  GATEWAY_PORT=8080
  WEB_PORT=8081

  # db config
  POSTGRES_USER=
  POSTGRES_PASSWORD=
  ```
</details>

# Build process

  

## To build containers

Use the included Makefile to build containers and start them

  

## Pre-build for release

Due to low RAM in used hosts and github runners application requires pre-building all services on local machine before pushing to release branch. Build must be made on Linux, preferably Ubuntu.