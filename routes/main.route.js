const express = require('express');
const Film = require('../models/film.model')
const Partner = require('../models/partner.model')
const Subscribe = require('../models/subscribe.model')
const i18next = require('i18next');
const mongoose = require('mongoose');
const router = express.Router();
router.get('/', async (req, res) => {
    const film = await Film
        .find()
        .lean()
    const partner = await Partner
        .find()
        .lean()
    res.render('browse', {
        title: "Main",
        ishome: true,
        film,
        partner,
        subscribed: req.flash('subscribed')
    });
});

router.post('/', async (req, res) => {
    const film = await Film
        .find({'category.en':req.body.category})
        .lean()
    const result = {
        title: "Main",
        ishome: true,
        film
    }
    res.render('browse', result);
});


router.post('/sbs', async (req, res) => {
    let url = req.body.url
    try {
        const subscribe = Subscribe({
            email: req.body.sbsemail,
        })
        await subscribe.save()
            req.flash('subscribed', 'You are now subscribed!')
            res.redirect(url)
    } catch (err) {
        console.log(err);
    }
})


router.post('/loc', async (req, res) => {
    try{
        const language = req.body.lng
        i18next.init({lng: language})
        mongoose.setDefaultLanguage(req.body.lng)
        res.redirect('back')
    }catch(err){console.log(err)}
})

module.exports = router;