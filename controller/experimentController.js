'use strict';

var Experiment = require('../model/Experiment');
var User = require('../model/User');
var debug = require('debug')('snaplab-server');
var ObjectId = require('mongodb').ObjectId;

exports.getExperiments = function(req, res){

    var today = new Date();
    var day20Before = new Date(today.setDate(today.getDate()-20));

    var field = req.query.field || 'title';
    var startDate = req.query.startdate || day20Before;
    var endDate = req.query.enddate || today;
    var sortType = req.query.sorttype || 'createdDateDescend';
    var content = req.query.content;

    debug(content)
    var pageNum = req.query.pagenum || 1;
    var pageItems = req.query.pageitems ||20;


    debug(req.query);

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

    Experiment.find(queryOption, 'labTitle description')
        .skip((pageNum-1) * pageItems)
        .limit(pageItems)
        .exec((err, experiments) => {
        if (err) {
            return res.send(err);
        }
        debug(experiments)
        if(experiments){
            res.json(experiments);
        }else{
            res.json([]);
        }
    });
};

exports.getOneExperiment = function(req, res){
    var title = req.params.title;
    console.log(title)
    Experiment.findOne({labTitle: title}).exec((err, experiments) => {
        if (err) {
            return res.send(err);
        }
        res.json(experiments);
    });
};

exports.insertExperiment = function(req, res){
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
