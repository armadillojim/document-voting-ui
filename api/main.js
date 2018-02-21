// Create an Express app
const express = require('express');
const app = express();

// Create a logging facility
const winston = require('winston');
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [new winston.transports.Console()]
});

// Create a listener promise for the API web server
const os = require('os');
const port = process.env.API_PORT || 3000;
const listen = () => {
    return new Promise((resolve, reject) => {
        app.listen(port, () => {
            logger.info(`api-server: listening on ${os.hostname()}:${port}`);
            resolve();
        });
    });
}

// Create a database promise for a connection
const mongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://document-voting-db:27017';
const dbName = process.env.DB_NAME;
const initDb = () => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(dbUrl, function(err, client) {
            if (err) {
                reject(err);
            } else {
                logger.info(`api-server: connected to ${dbUrl}/${dbName}`);
                resolve(client.db(dbName));
            }
        });
    });
}

// Start the listener and the database connection
Promise.all([
    listen(),
    initDb()
]).then(([_, pool]) => {
    // Install all our middleware
    // Install two default handlers for missing resources and for errors
    app.use('*', (err, req, res, next) => { res.sendStatus(404); });
    app.use((err, req, res, next) => {
        logger.error(`api-server got an error: ${err.message}\n${err.stack}`);
        res.sendStatus(500);
    });
})
.catch(err => {
    logger.error(err);
});
