const Investigation = require('../model/Investigation');
const debug = require('debug')('snaplab-server:controller');
const Message = require('../bean/message');

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
exports.getInvestigations = (req, res, next) => {

  const today = new Date();
  const day20Before = new Date(today.getTime() - 20 * 24 * 60 * 60 * 1000);

  debug(req.query);
  const fields = req.query.fields || 'title';
  const after = req.query.afterDate || day20Before;
  const before = req.query.beforeDate || today;
  const sort = req.query.sort || '-lastupdated';
  const query = req.query.query;

  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 20;

  const queryOption = {};
  queryOption.isPublished = true;
  if (fields != 'serial-number') {
    queryOption.lastUpdatedAt = {
      $gte: new Date(after),
      $lt: new Date(before)
    };
  }

  if (query) {
    const fieldArr = [];

    if (fields == 'all') {
      fieldArr.push({ labTitle: new RegExp(query, 'i') });
      fieldArr.push({ description: new RegExp(query, 'i') });
    }
    else if (fields == 'serial-number') {
      fieldArr.push({ serialNumber: query });
    }
    else {
      const fieldList = fields.split(';');
      fieldList.forEach((entry) => {
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

  let sortField;
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

  Investigation.find(queryOption, 'labTitle description createdBy lastUpdatedAt createdAt serialNumber ratingValue ratingCount')
    .skip((page - 1) * perPage)
    .limit(perPage)
    // .populate('createdBy', 'name')
    .populate({ path: 'createdBy', select: 'name email' })
    .sort(sortField)
    .exec((err, investigations) => {
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

exports.getOneInvestigation = (req, res) => {
  const id = req.params.id;
  debug(id);
  Investigation.findOne({ _id: id }).exec((err, investigations) => {
    if (err) {
      return res.send(err);
    }
    res.status(200).json(new Message(true, investigations, ''));
  });
};

exports.updateOneInvestigation = (req, res, next) => {
  const content = req.body;
  const id = req.params.id;
  debug(content);
  Investigation.findById(id).exec((err, result) => {
    result.videoPrefix = content.videoPredix;
    result.dataStorageAllowed = content.dataStorageAllowed;
    result.dataStoragePrefix = content.dataStoragePrefix;
    result.graphAutoStart = content.graphAutoStart;
    result.labTitle = content.labTitle;
    result.sampleInterval = content.sampleInterval;
    result.description = content.description;
    result.sensorTags = content.sensorTags;
    result.isPublished = content.isPublished;
    result.save ((err) =>{
      if (err) {
        next(err);
      } else {
        res.status(200).json(new Message(true, {}, 'Investigation Update Successfully!'));
      }
    });

  });
};

exports.deleteOneInvestigation = (req, res, next) => {
  debug(req.params.id);
  Investigation.findByIdAndRemove(req.params.id).exec((err) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json(new Message(true, {}, 'Investigation Delete Successfully!'));
    }
  });
};

exports.insertOneInvestigation = (req, res, next) => {
  const content = req.body;
  debug(content);
  let cursor = 0;

  const scanTags = (sensors) => {
    for (const i in sensors) {
      // console.log(i, sensors[i]);
      for (const j in sensors[i]) {
        debug(sensors[i][j]);
        if (sensors[i][j].display) {
          tagSet.add(i);
        }
      }
    }
  };

  const tagSet = new Set();
  while (content.sensorTags[cursor]) {
    // console.log(content.sensorTags[cursor]);
    scanTags(content.sensorTags[cursor].sensors);
    cursor++;
  }
  debug(tagSet);
  const tags = Array.from(tagSet);
  content.tags = tags;
  const newExp = new Investigation(content);
  newExp.save((err) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(new Message(true, {}, 'Investigation Add Successfully!'));
    }
  });
};

exports.getUserInvestigations = (req, res, next) => {
  const userId = req.params.userId;
  Investigation
    .find({ createdBy: userId })
    .populate({ path: 'createdBy', select: 'name email' })
    .sort({ lastUpdatedAt: -1})
    .exec((err, investigations) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(new Message(true, investigations, ''));
      }
    });
};
