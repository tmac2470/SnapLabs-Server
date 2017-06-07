var express = require('express');
var router = express.Router();
var controller = require('../controller/experimentController');

/* GET users listing. */
router.get('/', controller.getAllExperiments);

router.get('/:title', controller.getOneExperiment);

router.post('/', controller.insertExperiment);

module.exports = router;
