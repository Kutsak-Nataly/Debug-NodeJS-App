const router = require('express').Router();
const Game = require('../models/game');
const jwt = require('jsonwebtoken');
const {tokenKey} = require('../constant/constant');

function userId(token) {
    return jwt.verify(token, tokenKey);
}

router.get('/all', (req, res) => {
    Game.findAll({where: {owner_id: req.user.id}})
        .then(data => {
            res.status(200).json({
                games: data,
                message: "Data fetched."
            })
        })
        .catch(() => {
            res.status(500).json({
                message: "Data not found"
            })
        });
});

router.get('/:id', (req, res) => {
    Game.findOne({where: {id: req.params.id, owner_id: req.user.id}})
        .then(game => {
            res.status(200).json({
                game: game
            })
        })
        .catch(err => {
            res.status(500).json({
                message: `Data not found. ${err}`
            })
        });
});

router.post('/create', (req, res) => {
    const userId = userId(req.headers.authorization);
    const game = {
        title: req.body.game.title,
        owner_id: userId,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    };
    Game.create(game)
        .then(game => {
            res.status(200).json({
                game: game,
                message: "Game created."
            })
        })
        .catch(err => res.status(500).send(err.message));
});

router.put('/update/:id', (req, res) => {
    Game.update({
            title: req.body.game.title,
            studio: req.body.game.studio,
            esrb_rating: req.body.game.esrb_rating,
            user_rating: req.body.game.user_rating,
            have_played: req.body.game.have_played
        },
        {
            where: {
                id: req.params.id,
                owner_id: req.user
            }
        })
        .then(
            game => {
                res.status(200).json({
                    game: game,
                    message: "Successfully updated."
                })
            })
        .catch(err => res.status(500).json({message: err.message}));
});

router.delete('/remove/:id', (req, res) => {
    Game.destroy({
        where: {
            id: req.params.id,
            owner_id: req.user.id
        }
    })
        .then(game => {
            res.status(200).json({
                game: game,
                message: "Successfully deleted"
            })
        })
        .catch(err => res.status(500).json({error: err.message}));
});

module.exports = router;
