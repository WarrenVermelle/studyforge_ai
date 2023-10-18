# Pere Castor

Pere Castor is a student web project in the form of a web client which aims to generate stories with keywords.

## Installation

First, you will need to sign into OpenApi in order to get an API key: https://platform.openai.com/.

Once you have it, you need to create a `.env` file at the root of the projet (copy `.env.example`) and paste your key into the variable.
```
OPENAI_API_KEY="your-api-key"
```

## Getting started

You can run the whole project inside Docker using the following command :

```
docker-compose up
```

Otherwise you can run the following commands on your own to get the server started :

Get dependencies:
```
npm install
```

Run the node server:
```
node server
```
OR
```
nodemon server
```

Nodejs will be listening on `http://localhost:3000` by default.