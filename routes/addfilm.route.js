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
        title: 'Add Film or Event',
        ishome: true
    });
});

router.post('/', letin, imgMidle.upload.fields([{name: 'img', maxCount: 1}, {name: 'imgGal', maxCount: 5}]), async (req, res) => {
    try {    
        
        const isEvent = () => {
            if (req.body.event){
                return true
            }else{
                return false
            }
        }
         if (req.files.img && req.files.imgGal) {
            const filename = req.files.img.map(function(file) {
                return file.filename
               })
            const filenames = req.files.imgGal.map(function(file) {
                  return file.filename
                 })
            const film = Film({
                 ...req.body,
                 id: uuidv4(),
                 event: isEvent(),
                 img: filename.toString(),
                 imgGal: filenames,
                 userId: req.userId
             })
             const media = Media({
                img: filename.toString(),
                imgGal: filenames
             })
             await film.save(console.log("Added"))
             await media.save(console.log("Added"))
             res.redirect('addfilm')
         }else if (req.files.img) {
            const filename = req.files.img.map(function(file) {
                return file.filename
               })
            const film = Film({
                 ... req.body,
                 id: uuidv4(),
                 event: isEvent(),
                 img: filename.toString(),
                 imgGal: null,
                 userId: req.userId
             })
             const media = Media({
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
                 ...req.body,
                 id: uuidv4(),
                 img: null,
                 imgGal: filenames,
                 event: isEvent(),
                 userId: req.userId
             })
             const media = Media({
                imgGal: filenames,
            })
             await film.save(console.log("Added"))
             await media.save(console.log("Added"))
             res.redirect('addfilm')
         }else{
             const film = Film({
                 ... req.body,
                 id: uuidv4(),
                 img: null,
                 imgGal: null,
                 event: isEvent(),
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