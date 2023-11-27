require('dotenv').config();

const express = require('express');
const setRateLimit = require('express-rate-limit');

const app = express();

const rateLimitMiddleware = setRateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: {
        status: 429,
        error: 'Too many requests'
    },
    headers: true,
});

app.use((req, res, next) => {
    res.setHeader('X-Robots-Tag', 'noindex')
    next();
});

app.use(rateLimitMiddleware);
app.use(express.json());
app.use(express.static('client/build'));

app.listen(8080, () => {
    console.log(process.env.NODE_ENV + ' server listening on port: ', 8080);
});

/* ---------- routes ---------- */

const routesHandler = require('./src/handler');

app.get('/*', routesHandler.all);
app.post('/ask', routesHandler.ask);
app.post('/save', routesHandler.save);
app.post('/story', routesHandler.story);

/* ---------------------------- */

module.exports = app;