var express = require('express');
var router = express.Router();
var controller = require('../controller/experimentController');

/* GET users listing. */
router.get('/', controller.getAllExperiments);

module.exports = router;
