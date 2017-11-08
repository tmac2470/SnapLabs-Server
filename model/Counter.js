const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counters', counterSchema);
module.exports = Counter;
