'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var experimentSchema = new Schema({
    labTitle: String,
    description: String,
    sampleInterval: String,
    captureOnClick: Boolean,
    graphs: String,
    grids: String,
    sensorTags: Schema.Types.Mixed,
    dataStorageAllowed: Boolean,
    dataStoragePrefix: String,
    videoPrefix: String,
    graphAutoStart: Boolean,
    createdBy: Schema.Types.ObjectId,
    lastUpdatedAt: Date,
    isPublished: Boolean
});

experimentSchema.pre('save', function save(next) {
    this.lastUpdatedAt = new Date();
    next();
});

var Experiment = mongoose.model('Experiments', experimentSchema);
module.exports = Experiment;