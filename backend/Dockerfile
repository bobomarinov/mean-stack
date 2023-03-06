FROM node:14 AS build

# Create ExpressJS API
WORKDIR /app
RUN npm install express-generator -g
RUN express backend

WORKDIR /app/backend
RUN npm install

# Copy package.json and package-lock.json
# COPY package.json package-lock.json

CMD ["npm","start"]
