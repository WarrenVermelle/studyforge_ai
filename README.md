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

It will setup a node server locally.

Otherwise you can run the following commands on your own to run the project :

First, you need to get project's dependencies :

At the root folder and client folder
```
npm install
```

Next, you can build the app in client folder :
```
npm run build
```

Then run the server that will be serving the builded app, at the root of the project :

```
node index.js
```

or

If you don't want to restart the server after editing.
```
nodemon index.js
```

Node.js will be listening on [http://localhost:8080](http://localhost:8080) by default.

- - - -
## Usage

![usage](https://github.com/WarrenVermelle/pere_castor/assets/80685095/317e848c-6893-4173-b823-7daf03d69c86)

1. Type keywords you want to find into your generated story
2. Once ready, all your generated stories will appear here
3. You can copy the link of this story to your clipboard and share it with anyone
4. This button converts the text to speech
