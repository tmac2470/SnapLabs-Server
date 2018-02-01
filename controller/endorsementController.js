const Investigation = require('../model/Investigation');
const debug = require('debug')('snaplab-server:controller');
const Message = require('../bean/message');

exports.doEndorsement = (req, res, next) => {
  Investigation
    .update({ _id: req.params.id }, { $set: { 'endorsed': true, 'endorsedBy': req.payload._id , 'endorsedAt': new Date() } })
    .exec((err) => {
      if (err) return next(err);
      res.status(200).json(new Message(true, {}, 'Have it endorsed!'));
    });
};

exports.getEndorsedInvestigations = (req, res, next) => {
  Investigation
    .find({ endorsed: true }, 'labTitle serialNumber endorsed endorsedAt')
    .exec((err, item) => {
      if (err) return next(err);
      res.status(200).json(new Message(true, item, ''));
    });
};

exports.revokeEndorsement = (req, res, next) => {

  debug(req.payload);
  debug(req.params.id);

  Investigation
    .update({ _id: req.params.id }, { $set: { 'endorsed': false, 'endorsedBy': req.payload._id , 'endorsedAt': new Date()} })
    .exec((err) => {
      if (err) return next(err);
      res.status(200).json(new Message(true, {}, 'Have revoked the Endorsement!'));
    });
};
