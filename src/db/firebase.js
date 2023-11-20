const { initializeApp } = require('firebase/app');
const { getFirestore, doc, collection, getDoc, addDoc} = require('firebase/firestore');

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


async function getStory(story_id) {
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

module.exports = {
    getStory,
    saveStory
}