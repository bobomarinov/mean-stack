# Use the official Node.js 14 image as the base image
FROM node:14 AS build

# Create and set the working directory in the container
WORKDIR /app

RUN npm install
RUN npm install -g @angular/cli
# Create new Angular project
RUN ng new frontend

WORKDIR /app/frontend

COPY package.json package-lock.json
COPY package.json package.json 

CMD ["ng","serve","--host","0.0.0.0"]

# COPY frontend/src/ src/

# RUN ng build

# FROM nginx:1.19.2-alpine

# COPY --from=build /app/frontend/dist/frontend /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]