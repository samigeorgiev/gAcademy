const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { getRepository } = require('typeorm');

const Resource = require('./models/resource');

const router = new Router();

router.post('/upload/:token', (req, res) => {
    let resourceId;
    try {
        resourceId = jwt.verify(req.params.token, process.env.JWT_SECRET)
            .resourceId;
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }

    if (!req.files.resource) {
        return res.status(422).json({ message: 'Missing resource' });
    }
    if (req.files.resource.mimetype !== 'video/mp4') {
        return res.status(422).json({ message: 'Invalid filetype ' });
    }

    const filename = `v${new Date().getTime()}.mp4`;
    req.files.resource.mv('resources/' + filename, async error => {
        if (error) {
            return res.status(500).json({ message: 'FS error' });
        }

        const resourceRepository = getRepository(Resource);

        let resource;
        try {
            resource = await resourceRepository.findOneOrFail(resourceId);
        } catch (error) {
            // check for interbal error
            return res.status(422).json({ message: 'Resource not found' });
        }

        resource.path = filename;
        try {
            await resourceRepository.save(resource);
        } catch (error) {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json({ message: 'Success' });
    });
});

router.get('/download/:token', async (req, res) => {
    let resourceId;
    try {
        resourceId = jwt.verify(req.params.token, process.env.JWT_SECRET)
            .resourceId;
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const resourceRepository = getRepository(Resource);
    let resource;
    try {
        resource = await resourceRepository.findOneOrFail(resourceId);
    } catch (error) {
        // check from internal
        return res.status(422).json({ message: 'Resource not found' });
    }

    if (!resource.path) {
        return res.status(503).json({ message: 'Resource unavailable' });
    }
    res.download('resources/' + resource.path);
});

module.exports = router;
