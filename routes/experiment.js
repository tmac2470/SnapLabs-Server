var express = require('express');
var router = express.Router();
var controller = require('../controller/experimentController');

/* GET users listing. */
router.get('/', controller.getAllExperiments);

router.get('/getOne/:title', controller.getOneExperiment);

router.post('/putOne', controller.putOneExperiment);

module.exports = router;
