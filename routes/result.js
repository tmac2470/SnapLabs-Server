const express = require('express');
const router = express.Router();
const resultController = require('../controller/resultController');
const jwt = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

router.get('/user/:userId', resultController.getUserResults);

router.get('/:id/', resultController.getOneResult);

router.post('/user/:userid', auth, resultController.insertOneResult);

router.delete('/:id', auth, resultController.deleteOneResult);

module.exports = router;
