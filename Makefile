dev-up:
	npm run local-publish
	docker compose -f docker-compose.yaml --env-file dev.env up
dev-build:
	docker compose -f docker-compose.yaml --env-file dev.env build $(service)
dev-build-no-cache:
	npm run local-publish
	docker compose -f docker-compose.yaml --env-file dev.env build --no-cache

prod-up:
	docker compose -f docker-compose.production.yaml up -d
prod-prepare-build:
	docker compose -f docker-compose.production.yaml kill
prod-build:
	npm run install-yalcked-packages
	docker compose -f docker-compose.production.yaml build auth gateway maintainer
	docker compose -f docker-compose.production.yaml build api
	docker compose -f docker-compose.production.yaml build web