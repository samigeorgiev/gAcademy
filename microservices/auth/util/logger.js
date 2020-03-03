const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL,
    transports: [
        new winston.transports.File({
            filename: `logs/${process.env.NODE_ENV}/error.log`,
            level: 'error'
        }),
        new winston.transports.File({
            filename: `logs/${process.env.NODE_ENV}/all.log`,
        })
    ]
});

module.exports = logger;