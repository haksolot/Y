﻿FROM node:20 as build

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

RUN npm run build

FROM nginx:latest

# COPY frontend/dist /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 443