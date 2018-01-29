const Rating = require('../model/Rating');
const Investigation = require('../model/Investigation');
const debug = require('debug')('snaplab-server:controller');
const Message = require('../bean/message');

exports.insertOneRating = (req, res, next) => {

  const checkIfRated = () => {
    return Rating.findOne({ userId: req.params.userId, investigationId: req.params.investigationId });
  };

  const createRating = (rating) => {
    if (rating) {
      throw new Error('ExistingRating');
    }
    debug('in createRating');
    debug(req.params.userId);
    debug(req.params.investigationId);
    debug(req.body.ratingValue);
    const newRating = new Rating(
      {
        userId: req.params.userId,
        investigationId: req.params.investigationId,
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

  checkIfRated()
    .then(createRating)
    .then(propegate2investigation)
    .then(() => {
      res.status(200).json(new Message(true, {}, 'Add Rating Successfully!'));
    })
    .catch(err => {
      if (err.message == 'ExistingRating') {
        res.status(200).json(new Message(true, {}, 'You have rated it!'));
      } else {
        next(err);
      }
    });
};

exports.getRatings = (req, res, next) => {
  Rating
    .find({ userId: req.params.userId }, 'createdAt lastUpdatedAt value investigationId')
    .populate({path:'investigationId', select:'labTitle serialNumber'})
    .exec((err, rating) => {
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

  const deleteInRating = () => {
    debug('in delete phase 1');
    return Rating.findByIdAndRemove(req.params.id);
  };
  const deleteInInvestigation = (item) => {
    debug('in delete phase 2');
    debug(item);
    return Investigation
      .update({ _id: item.investigationId }, { $inc: { 'ratingCount': -1, 'ratingValue': -item.value } });
  };

  deleteInRating()
    .then(deleteInInvestigation)
    .then(() => {
      res.status(200).json(new Message(true, {}, 'Delete Rating Successfully!'));
    })
    .catch((err) => {
      return next(err);
    });
};
