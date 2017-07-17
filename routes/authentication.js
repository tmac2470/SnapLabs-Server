'use strict';

var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

router.post('/signin', userController.signIn);

router.post('/signup', userController.signUp);

router.post('/forget', userController.forget);

router.post('/reset', userController.reset);

module.exports = router;