# Usa una imagen base de Node.js para construir la aplicación
FROM node:18 as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:alpine as production-stage

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos construidos de Vue.js
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]