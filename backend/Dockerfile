# Using latest Node.js image
FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000
CMD ["node", "app.js"]