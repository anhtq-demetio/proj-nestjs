up:
	docker-compose up -d --build
down:
	docker-compose down
skyhub-db:
	docker exec -i -t skyhub-db bash
