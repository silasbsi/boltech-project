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

    } catch (err) {
        return res.status(400).send({ error: 'Error creating new task' });
    }
});

router.patch('/finish', async (req, res) => {
    const { projectId, taskId } = req.body;
    
    try {
        const task = await Task.findOne({ projectId, _id: taskId })
          
        task.finishedDate = new Date();
        await task.save();

        return res.send({ task });

    } catch (err) {
        return res.status(400).send({ error: 'Error finishing task' });
    }
});

router.get('/all', async (req, res) => {
    const { projectId } = req.query;
    try {
        const tasks = await Task.find({ projectId: projectId });
        return res.send({ tasks });

    } catch (err) {
        return res.status(400).send({ error: 'Error selecting tasks' });
    }
});

router.delete('/delete', async (req, res) => {
    const { projectId, taskId } = req.body;
    try {
        await Task.remove({ projectId, _id: taskId });
        
        return res.send({ taskId });
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting task' });
    }
});

router.patch('/update', async (req, res) => {
    const { projectId, taskId, description } = req.body;
    
    try {
        const task = await Task.findOne({ projectId, _id: taskId })
          
        task.description = description;
        await task.save();

        return res.send({ task });

    } catch (err) {
        return res.status(400).send({ error: 'Error updating task description' });
    }
});

module.exports = app => app.use('/tasks', router);