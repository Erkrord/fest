const express = require('express');
const Film = require('../models/film.model')
const Partner = require('../models/partner.model')
const router = express.Router();

router.get('/:slug', async (req, res) => {
    const film = await Film.findOne({slug: req.params.slug})
    const partner = await Partner
        .find()
        .lean()
    if (film !== null) {
        res.render('film', {
            title: "Film",
            film,
            partner,
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