const express = require('express');
const Film = require('../models/film.model')
const router = express.Router();

router.get('/', async (req, res) => {
    const film = await Film
        .find()
        .lean()
    res.render('browse', {
        title: "Main",
        ishome: true,
        film
    });
});

router.post('/', async (req, res) => {
    const film = await Film
        .find({category: req.body.category})
        .lean()
    const result = {
        title: "Main",
        ishome: true,
        film
    }
    res.render('browse', result);
});




module.exports = router;