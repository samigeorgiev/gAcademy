const { Router } = require('express');
const { getRepository } = require('typeorm');

const ControlClient = require('./controlClient');
const Resource = require('./models/resource');

const router = new Router();

const controlClient = new ControlClient(
    process.env.RESOURCE_MANAGEMENT_CONTROL_URL
);

router.post('/upload/:token', (req, res) => {
    controlClient.getResourceId(
        { token: req.params.token },
        (error, response) => {
            if (error) {
                // check for interbal error
                return res.send(401).json({ message: 'Invalid token' });
            }
            const resourceId = response.id;
            const filename = `v${new Date().getTime()}.mp4`;
            if (!req.files.resource) {
                return res.send(422).json({ message: 'Missing resource' });
            }
            req.files.resource.mv('resources/' + filename, async err => {
                if (err) {
                    return res.status(500).json({ message: 'FS error' });
                }

                const resourceRepository = getRepository(Resource);

                let resource;
                try {
                    resource = await resourceRepository.findOneOrFail(
                        resourceId
                    );
                } catch (error) {
                    // check for interbal error
                    return res
                        .status(422)
                        .json({ message: 'Resource not found' });
                }

                resource.path = filename;
                try {
                    await resourceRepository.save(resource);
                } catch (error) {
                    return res.status(500).json({ message: 'Database error' });
                }

                res.status(200).json({ message: 'Success' });
            });
        }
    );
});

router.get('/download/:token', (req, res) => {
    controlClient.getResourceId(
        { token: req.params.token },
        async (error, response) => {
            if (error) {
                // check for interbal error
                return res.send(401).json({ message: 'Invalid token' });
            }

            const resourceId = response.id;
            const resourceRepository = getRepository(Resource);
            let resource;
            try {
                resource = await resourceRepository.findOneOrFail(resourceId);
            } catch (error) {
                // check from internal
                return res.status(422).json({ message: 'Resource not found' });
            }

            if (!resource.path) {
                return res
                    .status(503)
                    .json({ message: 'Resource unavailable' });
            }
            res.download('resources/' + resource.path);
        }
    );
});

module.exports = router;
