var express = require('express');
var router = express.Router();
var controller = require('../controller/experimentController');
var jwt = require('express-jwt');

var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

/* GET users listing. */
router.get('/', controller.getExperiments);

router.get('/:title', controller.getOneExperiment);

router.post('/', auth, controller.insertExperiment);

module.exports = router;
