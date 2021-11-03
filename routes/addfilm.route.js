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

router.post('/', letin, imgMidle.upload.fields([{name: 'img', maxCount: 1}, {name: 'imgGal', maxCount: 5}]), async (req, res) => {
    try {    
         if (req.files.img) {
            const filename = req.files.img.map(function(file) {
                return file.filename
               })
            const filenames = req.files.imgGal.map(function(file) {
                  return file.filename
                 })
            const film = Film({
                 id: uuidv4(),
                 title: req.body.title,
                 category: req.body.category,
                 country: req.body.country,
                 languages: req.body.lang,
                 duration: req.body.duration,
                 date: req.body.date,
                 screeningTime: req.body.screeningTime,
                 img: filename.toString(),
                 imgGal: filenames,
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
                 img: filenames,
                 img: filename,
             })
             await film.save(console.log("Added"))
             await media.save(console.log("Added"))
             res.redirect('addfilm')
         }else if (req.files.imgGal){
            const filenames = req.files.imgGal.map(function(file) {
                return file.filename
               })
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
                 imgGal: filenames,
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
                img: filenames,
            })
             await film.save(console.log("Added"))
             await media.save(console.log("Added"))
             res.redirect('addfilm')
         }else{
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
                 imgGal: null,
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
            res.redirect('addfilm')
        }
         
        
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;