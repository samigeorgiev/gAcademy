// TODO prettier logging
const path = require('path');

const winston = require('winston');

const { combine, timestamp, label, printf } = winston.format;

const env = process.env.NODE_ENV || 'development';

const dirname = path.dirname(process.mainModule.filename);
const errorLog = path.join(dirname, 'logs', env, 'error.log');
const combinedLog = path.join(dirname, 'logs', env, 'combined.log');

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
        printf(info => `${info.level} [${info.label}]: ${info.message}`)
    ),
    transports
});

module.exports = logger;
