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

<br />


### To run the project locally

- Run `docker-compose build` to build the docker containers (Redis & the Backend)
- Run `docker-compose up` or `docker-compose up -d` (in detatched mode) to start the server


<br />

### Production Mode

This backend web application is deployed in production mode. I used an EC2 instance (t2.medium)
as the server. For production mode I used:

- **pm2** to manage the process.
- **Nginx** to reverse proxy and load balancing the application

You can find this on: https://api-nuport.mainly.codes

<br />

### Why I use the docker in the development mode, and pm2 on production mode?

I find docker is much easier and flexible in the development mode. As I dockerized the 
main application and Redis. And, since I took t2.medium EC2 instance, it can't load the 
docker and run the application swiftly. So, for this light application pm2 is enough 
capable doing stuff like this.