const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const User = require('../models/User');

const router = express.Router();

function generatetoken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists'});
        } 

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ 
            user,
            token: generatetoken({ id: user.id })
        });
    } catch (err) {
        return res.status(400).send({ error: 'Resgistration failed' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Invalid password' })
        }

        user.password = undefined;
        
        console.log({ 
            user, 
            token: generatetoken({ id: user.id }) 
        });
        return res.send({ 
            user, 
            token: generatetoken({ id: user.id }) 
        });
    } catch (err) {
        return res.status(400).send({ error: 'Authentication failed' });
    }
});

module.exports = app => app.use('/auth', router);