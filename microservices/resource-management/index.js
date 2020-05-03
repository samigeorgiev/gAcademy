const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

const port = process.env.PORT || 8004;

app.use(express.static('resources'));

app.listen(port, () =>
    console.log(`Port ${port}.`)
);

app.post('/upload', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            const video = req.files.video;

            video.mv('./resources/' + 'video.mp4');

            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: video.name,
                    mimetype: video.mimetype,
                    size: video.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/download', function(req, res) {
    const video = `${__dirname}/resources/video.mp4`;
    res.download(video);
});
