/**
 * Created by MushrChun on 29/6/17.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/User');

router.post('/signin', function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            var token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res, next);
});

router.post('/signup', function(req, res){


    var user = new User({
        email: req.body.email,
        password: req.body.password
    });

    User.findOne({email: req.body.email}, function(err, existingUser){
        if (err) next(err);
        if (existingUser) {
            return res.json({ status:'fail', mgs:'email exsists'});
        }


        user.save(function(err){
            if (err) {
                console.log('error');
                return next(err);
            }
            return res.json({ status:'success'});
        });
    });
});


module.exports = router;