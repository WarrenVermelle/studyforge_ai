require("dotenv").config();

const express = require('express');
const cors = require('cors')
const { OpenAI } = require("openai");

const app = express();
app.use(express.json());
app.use(cors())

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// post keywords for a story
app.post('/ask', async (req, res) => {

    let prompt = JSON.stringify(req.body.keywords);

    if (!prompt) {
        return res.status(404).json({
            success: false,
            message: "no keywords",
        });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { 
                    role: "user", 
                    content: "le meilleur des deux : " + req.body.keywords + " ?",
                }
            ],
        });

        const completion = response.choices[0].message.content;
        return res.status(200).json({
            success: true,
            message: completion,
        });
    } catch (error) {
        console.log(error.message);
    }
});

// put story in database

module.exports = app;