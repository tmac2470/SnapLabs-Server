'use strict';

var Investigation = require('../model/Investigation');
var debug = require('debug')('snaplab-server:controller');
var Message = require('../utils/util').Message;

/**
 * search controller
 * query parameter:
 *      afterDate: YYYY-MM-DD
 *      beforeDate: YYYY-MM-DD
 *      sort: lastUpdated, -lastUpdated, author, -author
 *      query:
 *      fields: title, description,serial-number,all(title + description)
 *      page: number
 *      perPage: number
 */
exports.getInvestigations = function (req, res, next) {

  var today = new Date();
  var day20Before = new Date(today.getTime() - 20 * 24 * 60 * 60 * 1000);

  debug(req.query);
  var fields = req.query.fields || 'title';
  var after = req.query.afterDate || day20Before;
  var before = req.query.beforeDate || today;
  var sort = req.query.sort || '-lastupdated';
  var query = req.query.query;

  var page = parseInt(req.query.page) || 1;
  var perPage = parseInt(req.query.per_page) || 20;

  var queryOption = {};
  queryOption.isPublished = true;
  if (fields != 'serial-number') {
    queryOption.lastUpdatedAt = {
      $gte: new Date(after),
      $lt: new Date(before)
    };
  }

  if (query) {
    var fieldArr = [];

    if (fields == 'all') {
      fieldArr.push({ labTitle: new RegExp(query, 'i') });
      fieldArr.push({ description: new RegExp(query, 'i') });
    }
    else if (fields == 'serial-number') {
      fieldArr.push({ serialNumber: query });
    }
    else {
      var fieldList = fields.split(';');
      fieldList.forEach(function (entry) {
        switch (entry) {
          case 'title':
            fieldArr.push({ labTitle: new RegExp(query, 'i') });
            break;
          case 'description':
            fieldArr.push({ description: new RegExp(query, 'i') });
            break;
        }
      });
    }

    queryOption['$or'] = fieldArr;
  }

  var sortField;
  switch (sort) {
    case '-lastupdated':
      sortField = { lastUpdatedAt: -1 };
      break;
    case 'lastupdated':
      sortField = { lastUpdatedAt: 1 };
      break;
    case 'author':
      sortField = { createdBy: 1 };
      break;
    case '-author':
      sortField = { createdBy: -1 };
      break;
    case '-createdate':
      sortField = { createdAt: -1 };
      break;
    case 'createdate':
      sortField = { createdAt: 1 };
      break;
  }

  Investigation.find(queryOption, 'labTitle description createdBy lastUpdatedAt createdAt serialNumber')
    .skip((page - 1) * perPage)
    .limit(perPage)
    // .populate('createdBy', 'name')
    .populate({ path: 'createdBy', select: 'name email' })
    .sort(sortField)
    .exec(function (err, investigations) {
      if (err) {
        return next(err);
      }
      if (investigations) {
        debug(investigations);
        res.status(200).json(new Message(true, investigations, ''));
      } else {

        res.status(200).json(new Message(true, [], ''));
      }
    });
};

exports.getOneInvestigation = function (req, res) {
  var id = req.params.id;
  debug(id);
  Investigation.findOne({ _id: id }).exec(function (err, investigations) {
    if (err) {
      return res.send(err);
    }
    res.status(200).json(new Message(true, investigations, ''));
  });
};

exports.updateOneInvestigation = function (req, res, next) {
  var content = req.body;
  var id = req.params.id;
  debug(content);
  Investigation.findById(id).exec(function (err, result) {
    result.videoPrefix = content.videoPredix;
    result.dataStorageAllowed = content.dataStorageAllowed;
    result.dataStoragePrefix = content.dataStoragePrefix;
    result.graphAutoStart = content.graphAutoStart;
    result.labTitle = content.labTitle;
    result.sampleInterval = content.sampleInterval;
    result.description = content.description;
    result.sensorTags = content.sensorTags;
    result.isPublished = content.isPublished;
    result.save(function (err) {
      if (err) {
        next(err);
      } else {
        res.status(200).json(new Message(true, {}, 'Investigation Update Successfully!'));
      }
    });

  });
};

exports.deleteOneInvestigation = function (req, res, next) {
  debug(req.params.id);
  Investigation.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      return next(err);
    } else {
      res.status(200).json(new Message(true, {}, 'Investigation Delete Successfully!'));
    }
  });
};

exports.insertOneInvestigation = function (req, res, next) {
  var content = req.body;
  debug(content);
  var cursor = 0;

  function scanTags(sensors) {
    for (var i in sensors) {
      // console.log(i, sensors[i]);
      for (var j in sensors[i]) {
        debug(sensors[i][j]);
        if (sensors[i][j].display) {
          tagSet.add(i);
        }
      }
    }
  }

  var tagSet = new Set();
  while (content.sensorTags[cursor]) {
    // console.log(content.sensorTags[cursor]);
    scanTags(content.sensorTags[cursor].sensors);
    cursor++;
  }
  debug(tagSet);
  var tags = Array.from(tagSet);
  content.tags = tags;
  var newExp = new Investigation(content);
  newExp.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.status(200).json(new Message(true, {}, 'Investigation Add Successfully!'));
    }
  });
};

exports.getUserInvestigations = function (req, res, next) {
  var userId = req.params.userId;
  Investigation
    .find({ createdBy: userId })
    .populate({ path: 'createdBy', select: 'name email' })
    .exec(function (err, investigations) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(new Message(true, investigations, ''));
      }
    });
};
