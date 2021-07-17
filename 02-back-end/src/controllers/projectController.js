const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const Project = require('../models/Project');

router.use(authMiddleware);

router.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const project = await Project.create(req.body);

        return res.send({ project });

    } catch (error) {
        return res.status(400).send({ error: 'Error creating new project' });
    }
});

module.exports = app => app.use('/projects', router);