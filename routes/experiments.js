'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controller/investigationController');
var jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

/* retrive all investigation based on conditional query. */
router.get('/', controller.getInvestigations);

/* retrive and add investigation to specific user */
router.get('/user/:userId', auth, controller.getUserInvestigations);
router.post('/user/:userId', auth, controller.insertOneInvestigation);


/* retrive, update and delete specific investigation */
router.get('/:id', controller.getOneInvestigation);
router.put('/:id', auth, controller.updateOneInvestigation);
router.delete('/:id', auth, controller.deleteOneInvestigation);

module.exports = router;
