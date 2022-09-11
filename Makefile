dev-up:
	npm run local-publish
	docker compose -f docker-compose.yaml --env-file dev.env up
dev-build:
	docker compose -f docker-compose.yaml --env-file dev.env build $(service)
dev-build-no-cache:
	npm run local-publish
	docker compose -f docker-compose.yaml --env-file dev.env build --no-cache api

prod-up:
	docker compose -f docker-compose.production.yaml --env-file dev.env up -d --wait
prod-build:
	npm run local-publish
	docker compose -f docker-compose.production.yaml --env-file dev.env build $(service)