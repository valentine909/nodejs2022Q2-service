run:
	docker run -d -p 3000:4000 --name service service-production
start:
	docker start service
stop:
	docker stop service
build-prod:
	docker build -t service-production -f Dockerfile.prod .
