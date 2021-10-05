const express = require('express');
const Film = require('../models/film.model')
const router = express.Router();

router.get('/', async (req, res) => {
    let qr = req
        .query
    const dates = await Film
        .find({}, 'date',).sort({date: 1})
        .lean()
    const key = 'date'
    const date = [...new Map(dates.map(item => [item[key], item])).values()];
    const film = await Film
        .find(qr)
        .lean()
    res.render('schedule', {
        title: 'schedule',
        isActive: true,
        isschedule: true,
        film,
        date
    });

});

module.exports = router;