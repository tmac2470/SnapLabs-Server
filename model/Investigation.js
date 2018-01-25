const mongoose = require('mongoose');
const Counter = require('./Counter');

const Schema = mongoose.Schema;


const investigationSchema = new Schema({
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
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: Date,
  lastUpdatedAt: Date,
  isPublished: Boolean,
  serialNumber: Number,
  endorsed: Boolean,
  ratingValue: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  tags: []
});

investigationSchema.pre('save', function save(next) {
  const doc = this;
  doc.lastUpdatedAt = new Date();
  if (this.isNew) {
    Counter
      .findByIdAndUpdate({ _id: 'serial-number' }, { $inc: { seq: 1 } })
      .exec((error, counter) => {
        if (error) return next(error);
        doc.serialNumber = counter.seq;
        next();
      });
    doc.createdAt = new Date();
  } else {
    next();
  }
});

const Investigation = mongoose.model('Investigation', investigationSchema);
module.exports = Investigation;
