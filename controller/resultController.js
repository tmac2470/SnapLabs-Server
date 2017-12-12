const Result = require('../model/Result');
const debug = require('debug')('snaplab-server:controller');
const Message = require('../bean/message');

exports.getUserResults = (req, res, next) => {
  Result.find(
    { userId: req.params.userId },
    'experimentId _id userId data'
  ).exec((err, result) => {
    if (err) return next(err);
    res.status(200).json(new Message(true, result, ''));
  });
};

exports.getOneResult = (req, res, next) => {
  Result.findById(req.params.id, 'experimentId data')
    .exec((err, result) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(new Message(true, result, ''));
    });
};

exports.insertOneResult = (req, res) => {
  const newResult = new Result();
  newResult.data = req.body.data;
  newResult.userId = req.body.userId;
  newResult.experimentId = req.body.experimentId;
  newResult.save((err) => {
    debug(err);
    res.status(200).json(new Message(true, {}, 'Add Result Successfully!'));
  });
};

exports.deleteOneResult = (req, res, next) => {
  Result.findOneAndRemove(req.params.id)
    .exec((err) => {
      if (err) return next(err);
      res.status(200).json(new Message(true, {}, 'Delete Result Successfully!'));
    });
};
