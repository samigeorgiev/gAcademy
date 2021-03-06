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

let logLevel;
switch (env) {
    case 'production':
        logLevel = 'warn';
        break;
    case 'development':
        logLevel = 'info';
        break;
    case 'test':
        logLevel = 'error';
        break;
}

const logger = winston.createLogger({
    level: logLevel,
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
