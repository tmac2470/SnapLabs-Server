/**
 * Created by MushrChun on 22/5/17.
 */
const Experiment = require('../model/Experiment');
const ObjectId = require('mongodb').ObjectId;

exports.getAllExperiments = (req, res) => {
    Experiment.find({}, 'labTitle').exec((err, experiments) => {
        if (err) {
            return res.send(err);
        }
        res.json(experiments);
    });
};