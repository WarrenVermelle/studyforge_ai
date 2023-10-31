# use a lightweight image
FROM node:21-alpine

WORKDIR /app

COPY .env .
COPY index.js .
COPY package.json .
COPY package-lock.json .

RUN npm install

CMD [ "node", "index.js" ]