FROM node:20-alpine as build
WORKDIR /usr/src/app
# variable utilisée dans le fichier angular.json pour créer des images avec des configurations différentes en fonction de l'environement
ARG CONFIGURATION

# Copie les fichiers package.json et package-lock.json files dans le container
COPY package*.json ./

# Configuration du cache
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install && \
  npm install -g @angular/cli

# Copie le code dans le container
COPY . .

RUN npm run build --configuration=$CONFIGURATION

# Environnement de dev
FROM build as dev
# Commande exécutée lorsque le container sera lancé en mode dev
CMD ["ng", "serve", "--host", "0.0.0.0"]

# Environnement de prod
FROM nginx:1.21-alpine as prod

# COPY --link pour éviter de casser le cache si l'on modifie l'image de base de la deuxième étape.
COPY --link nginx.conf /etc/nginx/conf.d/default.conf

# Copie les fichiers de l'application dans le container ngix
COPY --link --from=build /usr/src/app/dist/front /usr/share/nginx/html

EXPOSE 4200
