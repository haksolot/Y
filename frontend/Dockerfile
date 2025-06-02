# Étape 1 : build React
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : NGINX pour servir le build
FROM nginx:alpine

# On remplace le fichier de config nginx par défaut
COPY nginx.conf /etc/nginx/conf.d/default.conf

# On copie le build React dans le dossier que nginx sert
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

