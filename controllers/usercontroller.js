const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {tokenKey} = require('../constant/constant');

router.post('/signup', (req, res) => {
    const user = {
        full_name: req.body.full_name,
        username: req.body.username,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password)
    };
    User.create(user)
        .then(user => {
            const token = jwt.sign({id: user.id}, tokenKey, {expiresIn: 60 * 60 * 24});
            res.status(200).json({
                user: user,
                token: token
            });
        })
        .catch(err => res.status(500).send(err.message));
});

router.post('/signin', (req, res) => {
    User.findOne({where: {username: req.body.username}})
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.passwordHash)
                    .then(matches => {
                            if (matches) {
                                const token = jwt.sign({id: user.id}, tokenKey, {expiresIn: 60 * 60 * 24});
                                res.json({
                                    user: user,
                                    message: "Successfully authenticated.",
                                    sessionToken: token
                                });
                            } else {
                                res.status(502).send({error: "Passwords do not match."})
                            }
                        }
                    )
                    .catch(err => res.status(403).send({error: `User not found. ${err}`}));
            }
        })
        .catch(err => res.status(403).send({error: `User not found. ${err}`}));
});

module.exports = router;
