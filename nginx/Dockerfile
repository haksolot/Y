FROM nginx:latest

# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/nginx.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY certs /etc/nginx/certs
COPY frontend/dist /usr/share/nginx/html

EXPOSE 443