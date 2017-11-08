const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const jwt = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

router.post('/:id', auth, userController.updateProfile);

router.post('/:id/password', auth, userController.updatePassword);

module.exports = router;
