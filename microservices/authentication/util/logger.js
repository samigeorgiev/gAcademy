// TODO prettier logging
const winston = require('winston');

const {combine, timestamp, printf} = winston.format;

const logFormat = printf(({level, message, timestamp}) => {
    return `${level} at ${timestamp}: ${message}`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL,
    format: combine(timestamp(), logFormat),
    transports: [
        new winston.transports.File({
            filename: `logs/${process.env.NODE_ENV}/error.log`,
            level: 'error',
        }),
        new winston.transports.File({
            filename: `logs/${process.env.NODE_ENV}/all.log`,
        }),
    ],
});

module.exports = logger;
