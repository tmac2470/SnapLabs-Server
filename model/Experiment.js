'use strict';

var mongoose = require('mongoose');
var Counter = require('./Counter');

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
    createdBy: { type:Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date,
    lastUpdatedAt: Date,
    isPublished: Boolean,
    serialNumber: Number,
    tags: []
});

experimentSchema.pre('save', function save(next) {
    var doc = this;
    doc.lastUpdatedAt = new Date();
    if(this.isNew){
        Counter.findByIdAndUpdate({_id: 'serial-number'}, {$inc: {seq:1}}, function(error, counter) {
            if(error) return next(error);
            doc.serialNumber = counter.seq;
            next();
        });
        doc.createdAt = new Date();
    }else{
        next();
    }
});

var Experiment = mongoose.model('Experiments', experimentSchema);
module.exports = Experiment;