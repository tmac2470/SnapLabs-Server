'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controller/experimentController');
var jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

/* retrive all experiments based on conditional query. */
router.get('/', controller.getExperiments);

/* retrive and add experiment to specific user */
router.get('/user/:userId', auth, controller.getUserExperiments);
router.post('/user/:userId', auth, controller.insertOneExperiment);


/* retrive, update and delete specific experiment */
router.get('/:id', controller.getOneExperiment);
router.put('/:id', auth, controller.updateOneExperiment);
router.delete('/:id', auth, controller.deleteOneExperiment);

module.exports = router;
