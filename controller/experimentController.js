'use strict';

var Experiment = require('../model/Experiment');
var User = require('../model/User');
var debug = require('debug')('snaplab-server');

exports.getExperiments = function(req, res){

    var today = new Date();
    var day20Before = new Date(today.setDate(today.getDate()-20));

    var field = req.query.field || 'title';
    var after = req.query.after || day20Before;
    var before = req.query.before || today;
    var sort = req.query.sort || '-createdDated';
    var content = req.query.content;

    var page = parseInt(req.query.page) || 1;
    var perPage = parseInt(req.query.per_page) ||20;

    var queryOption = {};

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

    var id = req.params.id;

    if(id){
        queryOption.createdBy = id;
    }

    debug(queryOption)

    Experiment.find(queryOption, 'labTitle description createdBy lastUpdatedAt')
        .skip((page-1) * perPage)
        .limit(perPage)
        .exec(function(err, experiments) {
        if (err) {
            return res.send(err);
        }
        if(experiments){
            res.json(experiments);
        }else{
            res.json([]);
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
        console.log(experiments);
        res.json(experiments);
    });
};

exports.updateOneExperiment = function(req, res){
    var content = req.body;
    var id = req.params.id;
    console.log(id);
    Experiment.findById(id).exec(function(err, result){
        result.videoPrefix = content.videoPredix;
        result.dataStorageAllowed = content.dataStorageAllowed;
        result.dataStoragePrefix = content.dataStoragePrefix;
        result.graphAutoStart = content.graphAutoStart;
        result.labTitle = content.labTitle;
        result.sampleInterval = content.sampleInterval;
        result.description = content.description;
        result.sensorTags = content.sensorTags;
        result.save(function (err, result){
            console.log(err);
            if(err){
            }else{
                console.log('return success');
                res.json({status: 'success'});
            }
        });

    });
};

exports.deleteOneExperiment = function(req, res){
    console.log(req.params.id);
    Experiment.findByIdAndRemove( req.params.id, function(err){
        console.log('in here');
        if(err){
            return next(err);
        }else {
            res.json({status:'success'});
        }
    });
};

exports.insertOneExperiment = function(req, res){
    var content = req.body;
    var newExp = new Experiment(content);
    newExp.save(function(err, result){
        if(err){
            console.log(err);
            res.json({status: 'fail'});
        }else{
            res.json({status: 'success'});
        }
    });
};

exports.getUserExperiments = function(req, res){
    var userId = req.params.userId;
    Experiment.find({ createdBy: userId }, function(err, experiments) {
        if(err){
            return next(err);
        }else {
            res.json(experiments);
        }
    });
};