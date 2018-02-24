// Create an Express app
const express = require('express');
const app = express();

// Create a logging facility
const winston = require('winston');
const simpleFormat = winston.format.printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        simpleFormat
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
};

// Create a database promise for a connection
const mongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://document-voting-db:27017';
const dbName = process.env.DB_NAME;
const initDb = () => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(dbUrl, (err, client) => {
            if (err) {
                reject(err);
            } else {
                logger.info(`api-server: connected to ${dbUrl}/${dbName}`);
                resolve(client.db(dbName));
            }
        });
    });
};

// Start the listener and the database connection
Promise.all([
    listen(),
    initDb()
]).then(([_, db]) => {

    // Install all our middleware
    const commonComponent = require('./components/common')(logger);
    app.use(commonComponent);
    const documentComponent = require('./components/document')(db);
    app.use('/document', documentComponent);
    const statusComponent = require('./components/status')(db);
    app.use('/status', statusComponent);

    // Install two default handlers for missing resources and for errors
    app.use('*', (req, res, next) => { res.sendStatus(404); });
    app.use((err, req, res, next) => {
        const replacer = err instanceof Error ? Object.getOwnPropertyNames(err) : null;
        logger.error('api-server got an error: ' + JSON.stringify(err, replacer, 4));
        const status = err.status || 500;
        const message = err.message || 'Unknown error';
        res.status(status).send(message);
    });

}).catch((err) => {
    logger.error(err);
});
