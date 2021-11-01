const express = require('express');
const router = express.Router();
const Partner = require('../models/partner.model')

router.get('/',  async (req, res) => {
    const partner = await Partner
        .find()
        .lean()
    res.render('about', {
        title: 'About',
        isabout: true,
        partner,
        subscribed: req.flash('subscribed')
    });
});

module.exports = router;