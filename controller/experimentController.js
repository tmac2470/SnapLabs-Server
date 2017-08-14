'use strict';

var Experiment = require('../model/Experiment');
var User = require('../model/User');
var debug = require('debug')('snaplab-server');
var Message = require('../utils').Message;

/**
 * search controller
 * query parameter: 
 *      after: date
 *      before: date
 *      sort: lastUpdated, -lastUpdated, author, -author
 *      content:
 *      field: title, author, all
 *      page: number
 *      perPage: number
 */
exports.getExperiments = function(req, res){

    var today = new Date();
    var day20Before = new Date(today.setDate(today.getDate()-20));

    var field = req.query.field || 'title';
    var after = req.query.after || day20Before;
    var before = req.query.before || today;
    var sort = req.query.sort || '-lastupdated';
    var content = req.query.content;

    var page = parseInt(req.query.page) || 1;
    var perPage = parseInt(req.query.per_page) ||20;

    var queryOption = {};
    queryOption.isPublished = true;
    queryOption.lastUpdatedAt = {
        $gte: new Date(after),
        $lt: new Date(before)
    }

    if(content){
        var fields = field.split(';');
        fields.forEach( function(entry) {
            switch (entry){
                case 'title':
                    queryOption.labTitle = new RegExp(content, "i");
                    break;
                case 'author':
                    break;
            }
        });
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
        .sort(sortField)
        .exec(function(err, experiments) {
        if (err) {
            return next(err);
        }
        if(experiments){
            res.status(200).json(experiments);
        }else{
            res.status(200).json([]);
        }
    });
};

exports.getOneExperiment = function(req, res){
    var id = req.params.id;
    console.log(id)
    Experiment.findOne({_id: id}).exec(function (err, experiments) {
        if (err) {
            return res.send(err);
        }
        res.status(200).json(experiments);
    });
};

exports.updateOneExperiment = function(req, res){
    var content = req.body;
    var id = req.params.id;
    console.log(content);
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
                res.status(200).json(new Message('200', 'Success'));
            }
        });

    });
};

exports.deleteOneExperiment = function(req, res){
    console.log(req.params.id);
    Experiment.findByIdAndRemove( req.params.id, function(err){
        if(err){
            return next(err);
        }else {
            res.status(200).json(new Message('200', 'Success'));
        }
    });
};

exports.insertOneExperiment = function(req, res){
    var content = req.body;
    // console.log(content);

    var newExp = new Experiment(content);
    newExp.save(function(err, result){
        if(err){
            next(err);
        }else{
            res.status(200).json(new Message('200', 'Success'));
        }
    });
};

exports.getUserExperiments = function(req, res){
    var userId = req.params.userId;
    Experiment.find({ createdBy: userId }, function(err, experiments) {
        if(err){
            return next(err);
        }else {
            res.status(200).json(experiments);
        }
    });
};