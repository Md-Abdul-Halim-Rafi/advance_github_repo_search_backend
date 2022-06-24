FROM node:14.15.0

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

EXPOSE 3100

CMD ["npm", "start"]