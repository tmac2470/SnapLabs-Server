'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/signin', userController.signIn);

router.post('/signup', userController.signUp);

router.post('/forget', userController.forget);

router.post('/reset', userController.reset);

module.exports = router;
