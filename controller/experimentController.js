/**
 * Created by MushrChun on 22/5/17.
 */
var Experiment = require('../model/Experiment');
var ObjectId = require('mongodb').ObjectId;

exports.getAllExperiments = function(req, res){
    console.log();
    Experiment.find({}, 'labTitle description').exec((err, experiments) => {
        if (err) {
            return res.send(err);
        }
        res.json(experiments);
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