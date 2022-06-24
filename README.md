## Backend for Nuport take home task

### Environment file example (For development)
```
NODE_ENV=development

PORT=3100
API_PREFIX=/v1

REDIS_HOST=host.docker.internal
REDIS_PASSWORD=123456
```

I've used **Docker** and **Docker Compose** for the development environment.

### To run the project locally

- Run `docker-compose build` to build the docker containers (Redis & the Backend)
- Run `docker-compose up` to start the server