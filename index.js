require('dotenv').config();

const express = require('express');
const cors = require('cors')
const { OpenAI } = require('openai');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, collection, getDoc, getDocs, addDoc} = require('firebase/firestore');

const app = express();

app.use(express.json());
app.use(express.static('client/build'));
app.use(cors());

const path = require('path');
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

console.log('server started on port: ', PORT);
app.listen(PORT);

// ---------- SETUP OPENAI ----------

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ---------- ask chatGPT route ----------

app.post('/ask', async (req, res) => {

    let prompt = JSON.stringify(req.body.user_prompt);
    
    if (!prompt || prompt === '""') {
        return res.status(404).json({
            success: false,
            message: 'no user prompt',
        });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            max_tokens: 150,
            messages: [
                { 
                    role: 'user', 
                    content: 'Génère une histoire de moins de 50 mots en t\'inspirant de : ' + req.body.user_prompt + '.',
                }
            ],
        });

        const completion = response.choices[0].message.content;
        return res.status(200).json({
            success: true,
            user_prompt: req.body.user_prompt,
            message: completion,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.message
        });
    }
});

// ---------- firebase conf ----------

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storiesCollection = collection(db, 'stories');

// ---------- stories functions ----------

async function getStory(db, story_id) {
    try {
        const response = await getDoc(doc(db, 'stories', story_id));
        return response.data();
    } catch (error) {
        return error.message;
    }
}

async function saveStory(user_prompt, content) {
    try {
        const response = await addDoc(storiesCollection, {
            user_prompt: user_prompt,
            content: content,
            datetime: Date.now()
        });
        return response;
    } catch (error) {
        return error.message;
    }
}

// ---------- routes ----------

app.post('/save', async (req, res) => {
    let data = req.body.story;

    try {
        saveStory(data.user_prompt, data.content)
        .then((response) => {
            return res.status(200).json({
                success: true,
                story_id: response.id
            });
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.message
        });
    }
});

app.post('/story', async (req, res) => {
    const story_id = req.body.id;

    try {
        const story = await getStory(db, story_id)
        return res.status(200).json({
            success: true,
            user_prompt: story.user_prompt,
            content: story.content
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = app;