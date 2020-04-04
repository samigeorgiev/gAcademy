// TODO prettier logging
const path = require('path');

const winston = require('winston');

const { combine, timestamp, label, printf } = winston.format;

const env = process.env.NODE_ENV || 'development';

const errorLog = `logs/${env}/error.log`;
const combinedLog = `logs/${env}/combined.log`;

const transports = [
    new winston.transports.File({
        filename: errorLog,
        level: 'error'
    }),
    new winston.transports.File({
        filename: combinedLog
    })
];

if (env !== 'production') {
    transports.push(new winston.transports.Console());
}

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        label({ label: path.basename(process.mainModule.filename) }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(
            info =>
                // eslint-disable-next-line
                `${info.level} [${info.label}] at ${info.timestamp}: ${info.message}`
        )
    ),
    transports
});

module.exports = logger;
