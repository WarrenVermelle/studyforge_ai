require('dotenv').config();

const fs = require('fs');
const http = require('http');
const https = require('https');

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

http.createServer(app).listen(80, () => {
    console.log(process.env.NODE_ENV + ' server listening on port: ', 80);
})

if (process.env.NODE_ENV === 'production') {
    https.createServer({
        key: fs.readFileSync('path/to/key.pem'),
        cert: fs.readFileSync('path/to/cert.pem')
    }, app)
    .listen(443, () => {
        console.log('production server listening on port: ', 443);
    })
}

/* ---------- routes ---------- */

const routesHandler = require('./src/handler');

app.get('/*', routesHandler.all);
app.post('/ask', routesHandler.ask);
app.post('/save', routesHandler.save);
app.post('/story', routesHandler.story);

/* ---------------------------- */

module.exports = app;