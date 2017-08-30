'use strict';

var Experiment = require('../model/Experiment');
var User = require('../model/User');
var debug = require('debug')('snaplab-server');
var Message = require('../utils').Message;

/**
 * search controller
 * query parameter: 
 *      afterDate: YYYY-MM-DD
 *      beforeDate: YYYY-MM-DD
 *      sort: lastUpdated, -lastUpdated, author, -author
 *      query:
 *      fields: title, description, all
 *      page: number
 *      perPage: number
 */
exports.getExperiments = function(req, res){

    var today = new Date();
    var day20Before = new Date(today.getTime() - 20*24*60*60*1000);

    var fields = req.query.fields || 'title';
    var after = req.query.afterDate || day20Before;
    var before = req.query.beforeDate || today;
    var sort = req.query.sort || '-lastupdated';
    var query = req.query.query;

    var page = parseInt(req.query.page) || 1;
    var perPage = parseInt(req.query.per_page) ||20;

    var queryOption = {};
    queryOption.isPublished = true;
    queryOption.lastUpdatedAt = {
        $gte: new Date(after),
        $lt: new Date(before)
    }

    if(query){
        var fieldArr = [];

        if(fields == 'all'){
            fieldArr.push({labTitle: new RegExp(query, "i")});
            fieldArr.push({description: new RegExp(query, "i")});
        }else{
            var fieldList = fields.split(';');
            fieldList.forEach( function(entry) {
                switch (entry){
                    case 'title':
                        fieldArr.push({labTitle: new RegExp(query, "i")});
                        break;
                    case 'description':
                        fieldArr.push({description: new RegExp(query, "i")});
                        break;
                }
            });
        }

        queryOption['$or'] = fieldArr;
    }

    var sortField;
    switch(sort){
        case '-lastupdated':
            sortField = {lastUpdatedAt: -1};
            break;
        case 'lastupdated':
            sortField = {lastUpdatedAt: 1};
            break;
        case 'author':
            sortField = {createdBy: 1};
            break;
        case '-author':
            sortField = {createdBy: -1};
            break;
    }

    Experiment.find(queryOption, 'labTitle description createdBy lastUpdatedAt')
        .skip((page-1) * perPage)
        .limit(perPage)
        // .populate('createdBy', 'name')
        .populate({ path: 'createdBy', select: 'name email' })
        .sort(sortField)
        .exec(function(err, experiments) {
        if (err) {
            return next(err);
        }
        if(experiments){
            debug(experiments);
            res.status(200).json(new Message(true, experiments, ''));
        }else{
            
            res.status(200).json(new Message(true, [], ''));
        }
    });
};

exports.getOneExperiment = function(req, res){
    var id = req.params.id;
    debug(id)
    Experiment.findOne({_id: id}).exec(function (err, experiments) {
        if (err) {
            return res.send(err);
        }
        res.status(200).json(new Message(true, experiments, ''));
    });
};

exports.updateOneExperiment = function(req, res){
    var content = req.body;
    var id = req.params.id;
    debug(content);
    Experiment.findById(id).exec(function(err, result){
        result.videoPrefix = content.videoPredix;
        result.dataStorageAllowed = content.dataStorageAllowed;
        result.dataStoragePrefix = content.dataStoragePrefix;
        result.graphAutoStart = content.graphAutoStart;
        result.labTitle = content.labTitle;
        result.sampleInterval = content.sampleInterval;
        result.description = content.description;
        result.sensorTags = content.sensorTags;
        result.isPublished = content.isPublished;
        result.save(function (err, result){
            if(err){
            }else{
                res.status(200).json(new Message(true, {},'Experiment Update Successfully!'));
            }
        });

    });
};

exports.deleteOneExperiment = function(req, res, next){
    debug(req.params.id);
    Experiment.findByIdAndRemove( req.params.id, function(err){
        if(err){
            return next(err);
        }else {
            res.status(200).json(new Message(true, {}, 'Experiment Delete Successfully!'));
        }
    });
};

exports.insertOneExperiment = function(req, res){
    var content = req.body;
    debug(content);
    var cursor = 0;

    function scanTags(sensors){
        for(var i in sensors){
            // console.log(i, sensors[i]);
            for(var j in sensors[i]){
                debug(sensors[i][j]);
                if(sensors[i][j].display){
                    tagSet.add(i);
                }
            }
        }
    }

    var tagSet = new Set();
    while(content.sensorTags[cursor]){
        // console.log(content.sensorTags[cursor]);
        scanTags(content.sensorTags[cursor].sensors);
        cursor++;
    }
    debug(tagSet);
    var tags = Array.from(tagSet);
    content.tags = tags;
    var newExp = new Experiment(content);
    newExp.save(function(err, result){
        if(err){
            next(err);
        }else{
            res.status(200).json(new Message(true, {}, 'Experiment Add Successfully!'));
        }
    });
};

exports.getUserExperiments = function(req, res){
    var userId = req.params.userId;
    Experiment
    .find({ createdBy: userId })
    .populate({ path: 'createdBy', select: 'name email' })
    .exec(function(err, experiments) {
        if(err){
            return next(err);
        }else {
            res.status(200).json(new Message(true, experiments, ''));
        }
    });
};