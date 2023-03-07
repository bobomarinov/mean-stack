FROM node:14 AS build

# Create ExpressJS API
WORKDIR /app
RUN npm install express-generator -g
RUN express backend

WORKDIR /app/backend
RUN npm install


COPY package-lock.json package-lock.json
COPY package.json package.json
COPY app.js app.js

CMD ["npm","start"]
