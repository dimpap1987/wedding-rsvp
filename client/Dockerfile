# Stage 1 - Build Frontend Assets
FROM node:16-alpine3.14 as build

WORKDIR /usr/local/app
COPY package*.json ./
COPY . /usr/local/app/
RUN npm install
RUN npm run build


# Stage 2 - NGINX
FROM fholzer/nginx-brotli:v1.12.2

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/local/app/dist/client /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]