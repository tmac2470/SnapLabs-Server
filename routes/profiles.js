const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/jwtMiddleware');

router.post('/:id', auth, userController.updateProfile);

router.post('/:id/password', auth, userController.updatePassword);

module.exports = router;
