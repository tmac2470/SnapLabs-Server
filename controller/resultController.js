'use strict';

var Result = require('../model/Result');
var debug = require('debug')('snaplab-server:controller');
var Message = require('../utils/util').Message;

exports.getUserResults = function (req, res, next) {
  Result.find(
    { userId: req.params.userId },
    'experimentId _id userId data',
    function (err, result) {
      if (err) return next(err);
      res.status(200).json(new Message(true, result, ''));
    }
  );
};

exports.getOneResult = function (req, res, next) {
  Result.findById(req.params.id, 'experimentId data', function (err, result) {
    if (err) {
      return next(err);
    }
    res.status(200).json(new Message(true, result, ''));
  });
};

exports.insertOneResult = function (req, res) {
  var newResult = new Result();
  newResult.data = req.body.data;
  newResult.userId = req.body.userId;
  newResult.experimentId = req.body.experimentId;
  newResult.save(function (err) {
    debug(err);
    res.status(200).json(new Message(true, {}, 'Add Result Successfully!'));
  });
};

exports.deleteOneResult = function (req, res, next) {
  Result.findOneAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.status(200).json(new Message(true, {}, 'Delete Result Successfully!'));
  });
};
