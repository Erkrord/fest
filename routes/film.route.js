const express = require('express');
const Film = require('../models/film.model')
const router = express.Router();

router.get('/:slug', async (req, res) => {
    const film = await Film.findOne({slug: req.params.slug})

    if (film !== null) {
        res.render('film', {
            title: "Film",
            film,
            subscribed: req.flash('subscribed')
        });
    }
    else{
        res.render('404', {
            title: '404'
        }); 
    }
});

module.exports = router;