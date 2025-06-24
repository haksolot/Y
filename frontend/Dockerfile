# 1. Build stage
FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# # 2. Serve stage
# FROM nginx:stable-alpine

# # Copie les fichiers build dans nginx
# COPY --from=build /app/dist /usr/share/nginx/html

# Optionnel : config custom nginx si besoin
# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80
