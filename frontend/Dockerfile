# Use the official Node.js 14 image as the base image
FROM node:14 AS build

# Create and set the working directory in the container
WORKDIR /app

RUN npm install
RUN npm install --save-dev @types/node
RUN npm install axios --save
RUN npm install -g @angular/cli
RUN npm install @angular/common@latest @angular/compiler@latest @angular/core@latest @angular/forms@latest @angular/platform-browser@latest @angular/platform-browser-dynamic@latest @angular/router@latest @angular/animations@latest @angular/cdk@latest @angular/material@latest @angular/material-moment-adapter@latest @angular/flex-layout@latest rxjs@latest --save

# Create new Angular project
RUN ng new frontend

WORKDIR /app/frontend

COPY package.json package-lock.json
COPY package.json package.json 

# CMD ["ng","serve","--host","0.0.0.0"] --- for development only

COPY . .

RUN ng build

FROM nginx:latest

COPY --from=build /app/frontend/dist/frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]