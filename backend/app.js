require('dotenv').config();

const express = require('express');
const cors = require('cors')
const { OpenAI } = require('openai');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, collection, getDoc, getDocs, setDoc} = require('firebase/firestore');

const app = express();
app.use(express.json());
app.use(cors())

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ---------- ask chatGPT route ----------

app.post('/ask', async (req, res) => {

    let prompt = JSON.stringify(req.body.keywords);

    if (!prompt || prompt === '""') {
        return res.status(404).json({
            success: false,
            message: 'no keywords',
        });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { 
                    role: 'user', 
                    content: 'Génère une histoire de moins de 100 mots avec ces mots clés : ' + req.body.keywords + '.',
                }
            ],
        });

        const completion = response.choices[0].message.content;
        return res.status(200).json({
            success: true,
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
    authDomain: 'pere-castor-gaw.firebaseapp.com',
    databaseURL: 'https://pere-castor-gaw-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: 'pere-castor-gaw',
    storageBucket: 'pere-castor-gaw.appspot.com',
    messagingSenderId: '584979867404',
    appId: '1:584979867404:web:69f2c87b025531b9a30b29'
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// ---------- stories functions ----------

async function getStories(db) {
    try {
        const storiesCol = collection(db, 'stories');
        const storySnapshot = await getDocs(storiesCol);
        return storySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        throw new Error(`Erreur : ${error.message}`);
    }
}

async function getStory(db, id) {
    try {
        return (await getDoc(doc(db, "stories", id))).data()
    } catch (error) {
        throw new Error(`Erreur : ${error.message}`);
    }
}

async function saveStory(db, id, keywords, content) {
    try {
        await setDoc(doc(db, 'stories', id), {
            keywords: keywords,
            content: content,
            datetime: Date.now()
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.message
        });
    }
}

// ---------- routes ----------

app.post('/save', async (req, res) => {
    let datas = req.body.story;
    let id = await getStories(db).then((result) => { return result.length++ });

    try {
        saveStory(db, id.toString(), datas.keywords, datas.content).then(() => {
            return res.status(200).json({
                success: true,
                saved_id: id.toString()
            });
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/story', async (req, res) => {

    try {
        getStory(db, req.query.id).then((result) => {
            return res.status(200).json({
                story: result,
            });
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.message
        });
    }
});

// ------------------------------

app.get('/story/:id', async (req, res) => {

    getStory(db, req.params.id).then((response) => {
        res.send(`
            <html> 
                <body>
                    <div>keywords: ${response.keywords}</div>
                    <div>content: ${response.content}</div>
                </body>
            </html>
        `);
    });
    
})

module.exports = app;