const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  investigationId: { type: Schema.Types.ObjectId, ref: 'Investigation' },
  value: Number,
  createdAt: Date,
  lastUpdatedAt: Date,
});

ratingSchema.pre('save', function save(next) {
  const doc = this;
  doc.lastUpdatedAt = new Date();
  if (this.isNew) {
    doc.createdAt = new Date();
    next();
  } else {
    next();
  }
});

const Rating = mongoose.model('Ratings', ratingSchema);
module.exports = Rating;
