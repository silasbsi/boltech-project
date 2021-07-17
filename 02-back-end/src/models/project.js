const mongoose = require('../database');

const ProjectSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    
    createdDate: {
        type: Date,
        default: Date.now
    },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;