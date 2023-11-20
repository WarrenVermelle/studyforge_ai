const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function ask(request, result) {

    let prompt = JSON.stringify(request.body.user_prompt);
    
    if (!prompt || prompt === '""') {
        return result.status(404).json({
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
                    content: 'Génère une histoire de moins de 50 mots en t\'inspirant de : ' + request.body.user_prompt + '.',
                }
            ],
        });

        const completion = response.choices[0].message.content;
        return result.status(200).json({
            success: true,
            user_prompt: request.body.user_prompt,
            message: completion,
        });
    } catch (error) {
        return result.status(404).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    ask
}