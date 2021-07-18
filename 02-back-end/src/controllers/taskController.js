const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const Task = require('../models/Task');

router.use(authMiddleware);

router.post('/create', async (req, res) => {
    const { projectId, taskDescription } = req.body;
    try {
        const task = await Task.create({ projectId, description: taskDescription });

        return res.send({ task });

    } catch (error) {
        return res.status(400).send({ error: 'Error creating new task' });
    }
});

// router.patch('/update', async (req, res) => {
//     const { projectId, projectTitle } = req.body;

//     try {
//         const project = await Project.findOne({ _id: projectId })
        
//         project.name = projectTitle;

//         await project.save();

//         return res.send({ project });

//     } catch (error) {
//         return res.status(400).send({ error: 'Error updating project' });
//     }
// });

router.get('/all', async (req, res) => {
    const { projectId } = req.query;
    try {
        
        console.log('projectId', projectId)
        const tasks = await Task.find({ projectId: projectId });
        console.log('tasks', tasks)
        return res.send({ tasks });

    } catch (error) {
        return res.status(400).send({ error: 'Error selecting tasks' });
    }
});

module.exports = app => app.use('/tasks', router);