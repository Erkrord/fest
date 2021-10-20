const express = require('express');
const router = express.Router();
const Film = require('../models/film.model')
const User = require('../models/user.model')
const imgMidle = require('../middlewares/image.js')
const letin = require('../middlewares/letin')
const bcrypt = require('bcryptjs');

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
        }else{req.body.show = 'hide'}
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
    imgMidle.upload.single('img'),
    letin,
    async (req, res) => {
        try {
            if (req.body.show) {
                req.body.show = req.body.show
            }else{req.body.show = 'hide'}
            if (req.file) {
                await Film.updateOne({
                    id: req.params.id
                }, {
                    ...req.body,
                    img: req.file.filename
                })
            } else {
                await Film.updateOne({
                    id: req.params.id
                }, req.body)
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

module.exports = router;