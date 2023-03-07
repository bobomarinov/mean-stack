FROM node:14 AS build

# Create ExpressJS API
WORKDIR /app
RUN npm install express-generator -g

RUN express backend

COPY package*.json /app/backend/

WORKDIR /app/backend
RUN npm install

CMD ["npm", "start"]