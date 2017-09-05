'use strict';

var express = require('express');
var router = express.Router();
var resultController = require('../controller/resultController');
var jwt = require('express-jwt');

var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

router.get('/user/:userId',  resultController.getUserResults);

router.get('/:id/',  resultController.getOneResult);

router.post('/user/:userid',  auth, resultController.insertOneResult);

router.delete('/:id', auth, resultController.deleteOneResult);

module.exports = router;