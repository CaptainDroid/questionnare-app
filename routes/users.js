const express = require('express');
const router = express.Router();
const users = require('../models/users');
const jwt = require('jsonwebtoken');

// temporarily placing secret here. Move to database config file upon it's inception.
const secret = 'something_random';

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    let password = req.body.password;

    if (password === undefined) {
        password = "";
    }

    users.getUserByUsername(username, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                message: 'User not found.'
            });
            return;
        }
        users.comparePasswords(password, user.password, (err, isMatch) => {
            if (!isMatch) {
                res.json({
                    success: false,
                    message: 'Invalid username or password'
                });
            } else {
                const token = jwt.sign(user, secret, {
                    expiresIn: 64800
                });
                console.log(user)

                res.json({
                    success: true,
                    message: 'logged in successfully',
                    user: {
                        id: user.id,
                        username: user.username,
                        name: user.name,
                        token: 'JWT ' + token
                    }
                });
            }
        })
    });

});

module.exports = router;