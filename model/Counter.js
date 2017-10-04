'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

var Counter = mongoose.model('Counters', counterSchema);
module.exports = Counter;
