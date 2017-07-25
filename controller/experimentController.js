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
        .exec((err, experiments) => {
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
