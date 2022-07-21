run:
	docker run -d -p 3000:4000 --name service service-production
start:
	docker start service
stop:
	docker stop service
build-prod:
	docker build -t service-production -f Dockerfile.prod .
run-db:
	docker run --name postgres-db -d -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -e POSTGRES_DATABASE=db dev-app_api_db
