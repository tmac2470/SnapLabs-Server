'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/User');


passport.use(
  new LocalStrategy({
    usernameField: 'email'
  },
  function (email, password, done) {
    User.findOne({ email: email.toLowerCase() }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: 'Invalid email or password.' });
      });
    });
  })
);

module.exports = passport;
