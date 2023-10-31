# use a lightweight image
FROM node:21-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

# run build
CMD [ "npm", "run", "build" ]