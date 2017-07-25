'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var experimentSchema = new Schema({
    labTitle: String,
    description: String,
    sampleInterval: String,
    captureOnClick: String,
    graphs: String,
    grids: String,
    sensorTags: Schema.Types.Mixed,
    dataStorageAllowed: String,
    dataStoragePrefix: String,
    videoPrefix: String,
    graphAutoStart: String,
    createdBy: Schema.Types.ObjectId,
    lastUpdatedAt: Date
});

experimentSchema.pre('save', function save(next) {
    this.lastUpdatedAt = new Date();
    next();
});

var Experiment = mongoose.model('Experiments', experimentSchema);
module.exports = Experiment;