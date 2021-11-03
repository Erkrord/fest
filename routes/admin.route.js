const express = require('express');
const router = express.Router();
const Film = require('../models/film.model')
const User = require('../models/user.model')
const Media = require('../models/media.model')
const Partner = require('../models/partner.model')
const imgMidle = require('../middlewares/image.js')
const letin = require('../middlewares/letin')
const bcrypt = require('bcryptjs')
const fs = require('fs')

router.get('/', letin, async (req, res) => {
    const film = await Film
        .find()
        .lean()
    res.render('admin', {
        layout: 'admin.hbs',
        title: 'Admin',
        isAdmin: true,
        film
    });
});

router.post('/remove/:id', async (req, res) => {
    try {
        await Film.deleteOne({id: req.params.id})
        res.redirect('/admin')
        console.log('Ok')
    } catch (err) {
        console.log(err)
    }

})
router.get('/edit/:id', letin, async (req, res) => {
    const film = await Film
        .findOne({id: req.params.id})
        .lean()
    res.render('edit', {
        layout: 'admin.hbs',
        title: 'Edite',
        isEdit: true,
        film
    });
})
router.post('/edit/visible/:id', letin, async (req, res) => {
    try {
        if (req.body.show) {
            req.body.show = req.body.show
        } else {
            req.body.show = 'hide'
        }
        await Film.updateOne({
            id: req.params.id
        }, {show: req.body.show})
        res.redirect('/admin');
        console.log(req.body)
    } catch (err) {
        console.log(err)
    }

})
router.post(
    '/edit/update/:id',
    imgMidle.upload.fields([{name: 'img', maxCount: 1}, {name: 'imgGal', maxCount: 5}]),
    letin,
    async (req, res) => {
        try {
            if (req.body.show) {
                req.body.show = req.body.show
            } else {
                req.body.show = 'hide'
            }
            console.log(req.files.imgGal)
            if (req.files.img) {
                const filename = req.files.img.map(function(file) {
                    return file.filename
                   })
                const filenames = req.files.imgGal.map(function(file) {
                      return file.filename
                     })
                await Film.updateOne({
                    id: req.params.id
                }, {
                    ...req.body,
                    img: filename.toString(),
                    imgGal: filenames,
                })
                const media = Media({img: filename, img: filenames})
                await media.save(console.log("Image Added"))
            }else if(req.files.imgGal){
                const filenames = req.files.imgGal.map(function(file) {
                      return file.filename
                     })
                await Film.updateOne({
                    id: req.params.id
                }, {
                    ...req.body,
                    img: null,
                    imgGal: filenames,
                })
                const media = Media({img: filenames})
                await media.save(console.log("Image Added"))
            }else{
                await Film.updateOne({
                    id: req.params.id
                }, {
                   ...req.body,
                   languages: req.body.lang
                })
                
            console.log(req.body.lang)
            }
            res.redirect('/admin')
            console.log('Ok')
            console.log(req.body.show)

        } catch (err) {
            console.log(err)
        }

    }

)
router.get('/adduser', letin, async (req, res) => {
    const user = await User
        .find({id: req.params.id})
        .lean()
    res.render('adduser', {
        layout: 'admin.hbs',
        title: 'Add user',
        isAddUser: true,
        user
    });
})
router.post('/remove-user/:id', async (req, res) => {
    try {
        const del = await User.deleteOne({_id: req.params.id})
        res.redirect('../adduser');
    } catch (err) {
        console.log(err)
    }

})

router.post('/adduser', letin, async (req, res) => {
    try {
        await bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                console.log(err)
            }
            const user = User(
                {name: req.body.name, email: req.body.email, password: hash, role: req.body.role}
            )
            user.save(console.log("User Added"))
            res.redirect('adduser')
        });

    } catch (err) {
        console.log(err);
    }
})

router.get('/media', letin, async (req, res) => {
    const media = await Media
        .find()
        .lean()
    res.render('media', {
        layout: 'admin.hbs',
        title: 'Media',
        isMedia: true,
        media
    });
})
router.post('/elem/:img/:id', letin, async (req, res) => {
    try {
        await Media.deleteOne({_id: req.params.id})
        fs.unlink('uploads/\/' + req.params.img, (err) => {
            if (err) {
                console.log("failed to delete local image:" + err);
            } else {
                console.log('successfully deleted local image');
            }
        });
        res.redirect('/admin/media')
    } catch (err) {
        console.log(err);
    }
})
router.get('/addpartner', letin, async (req, res) => {
    const partner = await Partner
        .find()
        .lean()
    res.render('addpartner', {
        layout: 'admin.hbs',
        title: 'Add Partner',
        isAddPartner: true,
        partner
    });
})
router.post('/addpartner', letin, imgMidle.upload.single('img'), async (req, res) => {
    try {
        const partner = Partner({
            name: req.body.name,
            img: req.file.filename,
            link: req.body.link,
        })
        await partner.save(console.log("Partner added"))
        const media = Media({img: req.file.filename})
        await media.save(console.log("Image Added"))
            res.redirect('addpartner')
    } catch (err) {
        console.log(err);
    }
})
router.post('/remove-partner/:id', async (req, res) => {
    try {
        await Partner.deleteOne({_id: req.params.id})
        res.redirect('../addpartner');
    } catch (err) {
        console.log(err)
    }

})
module.exports = router;