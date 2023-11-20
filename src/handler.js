const path = require('path');
const { saveStory, getStory } = require('./db/firebase');
const { ask } = require('./api/openai');

exports.all = (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
}

exports.ask = (req, res) => {
    ask(req, res);
}

exports.save = (req, res) => {
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
}

exports.story = (req, res) => {
    const story_id = req.body.id;

    try {
        getStory(story_id)
        .then((response) => {
            return res.status(200).json({
                success: true,
                user_prompt: response.user_prompt,
                content: response.content
            });
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.message
        });
    }
}