# Pere Castor

Pere Castor is a student web project in the form of a web client which aims to generate stories with keywords.

Stories are generated with the completions engine API from OpenAI.

You can share your generated story by clicking on the share button and listen it with text-to-speech button.

## Installation

First, you will need to sign into OpenApi in order to get an API key: https://platform.openai.com/

Once you have it, you need to create a `.env` file at the root of the server folder (copy `.env.example`) and paste your key.
```
OPENAI_API_KEY='your-api-key'
```

Next, you need to create/use Google account to create Firestore database on Firebase : https://firebase.google.com/ and paste config constants into the `.env` file.
```
FIREBASE_API_KEY=''
FIREBASE_AUTH_DOMAIN=''
FIREBASE_DATABASE_URL=''
FIREBASE_PROJECT_ID=''
FIREBASE_STORAGE_BUCKET=''
FIREBASE_MESSAGING_SENDER_ID=''
FIREBASE_APP_ID=''
```

## Getting started

You can run the whole project inside Docker using the following command :

```
docker-compose up
```

It will setup a nginx server (frontend) and node server (backend) locally.

Otherwise you can run the following commands on your own to run the project :

First, you need to get project's dependencies :

```
npm install
```
Next, you can start the client :

```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

And then, start the node.js server from `./server/`:

```
node server
```
OR
```
nodemon server
```

Node.js will be listening on [http://localhost:8080](http://localhost:8080) by default.