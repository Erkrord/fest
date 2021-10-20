const express = require('express');
const Film = require('../models/film.model')
const router = express.Router();

router.get('/:id', async (req, res) => {
    const film = await Film.findOne({id: req.params.id})

    if (film !== null) {
        res.render('film', {
            title: "Film",
            film
        });
    }
    else{
        res.render('404', {
            title: '404'
        }); 
    }
});

module.exports = router;