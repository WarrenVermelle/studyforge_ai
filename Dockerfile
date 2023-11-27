# use a lightweight image
FROM node:21-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./client /app/client
WORKDIR /app/client

# install dependencies and build the app
RUN npm install
RUN npm run build

WORKDIR /app
COPY index.js .
COPY .env .

EXPOSE 8080

# run the server
CMD ["npm run", "start-prod"]