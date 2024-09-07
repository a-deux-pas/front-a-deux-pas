# Build stage

# Uses a lightweight Node.js image for the build phase
FROM node:20-slim AS build

# Sets the working directory in the container
WORKDIR /app

# Copies package.json and package-lock.json
# This allows us to install dependencies before copying the rest of the code
COPY package*.json ./

# Installs all dependencies
# npm ci is faster and more reliable than npm install for CI/CD environments
RUN npm ci

# Copies the rest of the project files into the container
COPY . .

# Runs the build script for the Angular application
# --configuration production ensures the app is built with production optimizations
RUN npm run build -- --configuration local


# Production stage

# Uses a lightweight Nginx Alpine image to serve the application
FROM nginx:alpine

# Create a non-root user
RUN adduser -D -h /home/app -u 1000 app
USER app
WORKDIR /home/app

# Copies the build files from the previous stage to the app home
COPY --from=build /app/dist/front /home/app

# Copies the custom Nginx configuration file to app home
COPY nginx.conf /home/app/nginx.conf

# Indicates that the container will listen on port 1080
EXPOSE 1080

# Runs Nginx
CMD ["nginx", "-c", "/home/app/nginx.conf", "-p", "/home/app"]
