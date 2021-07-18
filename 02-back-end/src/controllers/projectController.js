const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const Project = require('../models/Project');

router.use(authMiddleware);

router.post('/register', async (req, res) => {
    try {
        const project = await Project.create(req.body);

        return res.send({ project });

    } catch (error) {
        return res.status(400).send({ error: 'Error creating new project' });
    }
});

router.patch('/update', async (req, res) => {
    const { projectId, projectTitle } = req.body;

    try {
        const project = await Project.findOne({ _id: projectId })
        
        project.name = projectTitle;

        await project.save();

        return res.send({ project });

    } catch (error) {
        return res.status(400).send({ error: 'Error updating project' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const projects = await Project.find(req.body)

        return res.send({ projects });

    } catch (error) {
        return res.status(400).send({ error: 'Error selecting project' });
    }
});

module.exports = app => app.use('/projects', router);