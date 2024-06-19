# use the latest Node LTS (v20) in Debian bookworm image
FROM node:20-bookworm

# set args with default values, can be changed at build time with docker build --buil-args option
ARG ANGULAR_CONFIG=production \
    ANGULAR_MAJOR_VERSION=17 \
    APP_UID=1001

# create app-user to avoid running app as root and install Angular CLI globally
RUN useradd -U -m -d /app/ -s /bin/bash -u ${APP_UID} app-user && \
    npm install -g @angular/cli@${ANGULAR_MAJOR_VERSION}

# switch to user app and its home directory
USER app-user
WORKDIR /app

# copy application files and change owner (chown) to app-user
COPY --chown=${APP_UID}:${APP_UID} package.json angular.json tsconfig*.json /app/
ADD --chown=${APP_UID}:${APP_UID}  src /app/src

# create environments directory and copy environment.secrets.ts
COPY --chown=${APP_UID}:${APP_UID} ./src/environments/environment.secrets.ts /app/src/environments/environment.secrets.ts
# modify file permissions to ensure that only authorized users have write access
RUN chmod 644 /app/src/environments/environment.secrets.ts

# install dependencies and build application
RUN npm set cache /app/.npm && \
    npm install && \
    npm run build --configuration=${ANGULAR_CONFIG}

# make app and tmp directories writable when container is running in readonly
VOLUME /app /tmp

# set default command to start application and expose application port
CMD ["ng", "serve", "--host", "0.0.0.0"]
EXPOSE 4200
