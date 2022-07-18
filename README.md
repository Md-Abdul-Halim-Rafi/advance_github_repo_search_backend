## Backend for Nuport take home task

### Environment file example (For development)
```
NODE_ENV=development

PORT=3100
API_PREFIX=/v1

REDIS_HOST=host.docker.internal
REDIS_PASSWORD=123456
```

<br />

I used the Redis to store the data from GitHub API for 15 minutes. So that, I can reduce the 
server response time a little. Also, I used the rate-limit machanism to prevent misuse of it. 

<br />

### To run the project locally
I've used **Docker** and **Docker Compose** for the development environment.

- Run `docker-compose build` to build the docker containers (Redis & the Backend)
- Run `docker-compose up` or `docker-compose up -d` (in detatched mode) to start the server


<br />

### Production Mode

This backend web application is deployed in production mode. I used an EC2 instance (t2.medium)
as the server. For production mode I used:

- **pm2** to manage the process.
- **Nginx** to reverse proxy and load balancing the application

You can find this on: https://api-nuport.mainly.codes

### Test with a frontend

You can find it's frontend project in React.Js here: https://github.com/Md-Abdul-Halim-Rafi/advance_github_repo_search_frontend.
How to get started with the frontend, you can find the documentation inside the repository.

<br />

### Why I use the docker in the development mode, and pm2 on production mode?

I find docker is much easier and flexible in the development mode. As I dockerized the 
main application and Redis. And, since I took t2.medium EC2 instance, it can't load the 
docker and run the application swiftly. So, for this light application pm2 is enough 
capable doing stuff like this.
