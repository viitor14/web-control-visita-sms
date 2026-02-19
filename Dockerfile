# ESTÁGIO 1: Build com Node 24
FROM node:24-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ESTÁGIO 2: Servidor Web Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Regra obrigatória para o React não dar Erro 404 ao usuário dar F5
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
