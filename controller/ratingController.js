const Rating = require('../model/Rating');
const Investigation = require('../model/Investigation');
const debug = require('debug')('snaplab-server:controller');
const Message = require('../bean/message');

exports.insertOneRating = (req, res) => {

  const createRating = () => {
    debug('in createRating');
    debug(req.params.userId);
    debug(req.params.investigationId);
    debug(req.body.ratingValue);
    const newRating = new Rating(
      {
        userId: req.params.userId,
        investigationId:  req.params.investigationId,
        value: req.body.ratingValue
      }
    );
    return newRating.save();
  };

  const propegate2investigation = () => {
    debug('in propegation');
    return Investigation
      .update({ _id: req.params.investigationId }, { $inc: { 'ratingCount': 1, 'ratingValue': req.body.ratingValue } });
  };

  createRating()
    .then(propegate2investigation)
    .then(() => {
      res.status(200).json(new Message(true, {}, 'Add Rating Successfully!'));
    })
    .catch(err => {
      debug(err);
    });
};

exports.getRatings = (req, res, next) => {
  Rating.find(
    { userId: req.params.userId }
  ).exec((err, rating) => {
    if (err) return next(err);
    res.status(200).json(new Message(true, rating, ''));
  });
};

exports.getOneRating = (req, res, next) => {
  Rating.findById(req.params.id)
    .exec((err, rating) => {
      if (err) return next(err);
      res.status(200).json(new Message(true, rating, ''));
    });
};

exports.deleteOneRating = (req, res, next) => {
  Rating.findOneAndRemove(req.params.id)
    .exec((err) => {
      if (err) return next(err);
      res.status(200).json(new Message(true, {}, 'Delete Rating Successfully!'));
    });
};
