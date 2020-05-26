const fs = require('fs');

const express = require('express');
const fileUpload = require('express-fileupload');
const { createConnection } = require('typeorm');

const service = require('./service');

const main = async () => {
    try {
        await createConnection();
    } catch (error) {
        return console.log(error);
    }

    if (!fs.existsSync('resources')) {
        fs.mkdirSync('resources');
    }

    const app = express();

    app.use(
        fileUpload({
            limits: { fileSize: process.env.MAX_FILE_SIZE },
            abortOnLimit: true
        })
    );

    app.use(service);

    app.listen(process.env.PORT);
};

main();
