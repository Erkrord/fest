const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        isLogin: true
    });
});

router.get('/logout', (req, res) => {
    req
        .session
        .destroy((e) => {
            if (e) {
                throw e
            }
            res.redirect('/auth/login')
        });

})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const condidate = await User.findOne({email: email})
        if (condidate) {
            const isSame = bcrypt.compare(password, condidate.password);
            if (isSame) {
                req.session.user = condidate
                req.session.isAuthenticated = true;
                req
                    .session
                    .save((err) => {
                        if (err) {
                            throw err
                        }
                        res.redirect('/admin')
                    })
            } else {
                res.redirect('/auth/login')
            }
        } else {
            res.redirect('/auth/login')
        }
    } catch (e) {
        console.log(e)
    }

})

module.exports = router;

// req.session.isAuthenticated = true;   req.session.save((err) => {     if
// (err){       throw err     }     console.log(user)     res.redirect('/admin')
// if(user.email === user.email && user.password === user.password){}