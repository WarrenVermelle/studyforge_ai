require("dotenv").config();

const express = require('express');
const { OpenAI } = require("openai");

const app = express();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

// post keywords for a story
app.post('/ask', async (req, res) => {
    const prompt = req.body.keywords;

    try {
        if (prompt == null) {
            throw new Error("no prompt was provided");
        }

        if (prompt instanceof Array) {
            let keyword_list = "";

            for(let i = 0; i < prompt.length; i++) {
                if (i === prompt.length - 1) {
                    keyword_list += prompt[i] + '.';
                } else {
                    keyword_list += prompt[i] + ", ";
                }
            }
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { 
                    role: "user", 
                    content: "Oui ou non?",
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