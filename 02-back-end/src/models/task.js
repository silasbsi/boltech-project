const mongoose = require('../database');

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        require: true,
    },
    
    createdDate: {
        type: Date,
        default: Date.now
    },

    finishedDate: {
        type: Date,
        default: null
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;