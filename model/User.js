'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;


const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  passwordResetToken: String,
  passwordResetExpires: String
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    cb(err, isMatch);
  });
};

userSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.JWT_SECRET);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
