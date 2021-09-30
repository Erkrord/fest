const express = require('express');
const Film = require('../models/film.model')
const router = express.Router();

router.get('/:id', async (req, res) => {
    const film = await Film.findOne({id: req.params.id})

    res.render('film', {
        title: "Film",
        film
    });
});

module.exports = router;