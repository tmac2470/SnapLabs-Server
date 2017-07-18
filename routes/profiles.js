'use strict';

var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var jwt = require('express-jwt');

var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

router.post('/:id', auth, userController.updateProfile);

router.post('/:id/password', auth, userController.updatePassword);

module.exports = router;