dev-up:
	npm run local-publish
	docker compose -f docker-compose.yaml --env-file dev.env up
dev-build:
	docker compose -f docker-compose.yaml --env-file dev.env build $(service)
dev-build-no-cache:
	npm run local-publish
	docker compose -f docker-compose.yaml --env-file dev.env build --no-cache api