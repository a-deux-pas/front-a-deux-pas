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
RUN npm run build -- --configuration production


# Production stage

# Uses a lightweight Nginx Alpine image to serve the application
FROM nginx:alpine

# Create a non-root user
RUN adduser -D -u 1000 appuser

# Copies the build files from the previous stage to the Nginx server directory
# /app/dist/front is the default output path for an Angular app named "front"
COPY --from=build --chown=appuser:appuser /app/dist/front /usr/share/nginx/html

# Copies the custom Nginx configuration file
# This file should be present in the Docker build context
COPY nginx.conf /etc/nginx/nginx.conf

# Change ownership of necessary directories
RUN chown -R appuser:appuser /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && chown -R appuser:appuser /var/run/nginx.pid

# Switch to non-root user
USER appuser

# Indicates that the container will listen on port 80
EXPOSE 80

# Runs Nginx in non-daemon mode, keeping the container active
CMD ["nginx", "-g", "daemon off;"]
