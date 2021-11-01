const {v4: uuidv4} = require('uuid')
const Film = require('../models/film.model')
const Media = require('../models/media.model')
const express = require('express');
const router = express.Router();
const imgMidle = require('../middlewares/image.js')
const letin = require('../middlewares/letin')

router.get('/', letin, (req, res) => {
    res.render('addfilm', {
        layout: 'admin.hbs',
        title: 'Add Film',
        ishome: true
    });
});

router.post('/', letin, imgMidle.upload.single('img'), async (req, res) => {
    try {
        if (req.file) {
            const film = Film({
                id: uuidv4(),
                title: req.body.title,
                category: req.body.category,
                country: req.body.country,
                languages: req.body.lang,
                duration: req.body.duration,
                date: req.body.date,
                screeningTime: req.body.screeningTime,
                img: req.file.filename,
                description: req.body.description,
                director: req.body.director,
                producer: req.body.producer,
                editor: req.body.editor,
                exProducer: req.body.exProducer,
                editor: req.body.editor,
                cast: req.body.cast,
                fLink: req.body.fLink,
                show: req.body.show,
                userId: req.userId
            })
            const media = Media({
                img: req.file.filename,
            })
            await film.save(console.log("Added"))
            await media.save(console.log("Added"))
            res.redirect('addfilm')
        } else {
            const film = Film({
                id: uuidv4(),
                title: req.body.title,
                category: req.body.category,
                country: req.body.country,
                languages: req.body.lang,
                duration: req.body.duration,
                date: req.body.date,
                screeningTime: req.body.screeningTime,
                img: null,
                description: req.body.description,
                director: req.body.director,
                producer: req.body.producer,
                editor: req.body.editor,
                exProducer: req.body.exProducer,
                editor: req.body.editor,
                cast: req.body.cast,
                fLink: req.body.fLink,
                show: req.body.show,
                userId: req.userId
            })
            await film.save(console.log("Added without Photo"))
            console.log(req.body)
            res.redirect('addfilm')
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;