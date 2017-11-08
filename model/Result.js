'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resultSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  experimentId: { type: Schema.Types.ObjectId, ref: 'Experiment' },
  data: Schema.Types.Mixed
});


const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
