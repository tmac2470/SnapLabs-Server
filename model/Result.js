'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var resultSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    experimentId: { type:Schema.Types.ObjectId, ref: 'Experiment' },
    data: Schema.Types.Mixed
});


var Result = mongoose.model('Result', resultSchema);
module.exports = Result;