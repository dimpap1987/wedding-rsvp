# Stage 1 - MongoDb
# FROM mongo

# EXPOSE 27017
# VOLUME [ "/data/db" ]

# Stage 2 - Express api
FROM node:16-alpine3.14

WORKDIR /usr/src/app
COPY package*.json ./
COPY . /usr/src/app
RUN npm install
EXPOSE 9000
CMD ["npm", "start"]