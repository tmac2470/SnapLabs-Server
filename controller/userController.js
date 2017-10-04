'use strict';

var passport = require('passport');
var crypto = require('crypto');
var async = require('async');
var nodemailer = require('nodemailer');
var debug = require('debug')('snaplab-server:controller');
var aws = require('aws-sdk');
var Message = require('../utils/util').Message;
var User = require('../model/User');


exports.signIn = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      var token = user.generateJwt();
      res.status(200).json(
        new Message(
          true,
          { 'token': token },
          'Sign In Successfully!'
        ));
    } else {
      // If user is not found
      res.status(401).json(new Message(false, {}, info.msg));
    }
  })(req, res, next);
};

exports.signUp = function (req, res, next) {

  var extractedName = req.body.email.split('@')[0];

  var user = new User({
    email: req.body.email,
    password: req.body.password,
    name: extractedName
  });

  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (err) next(err);
    if (existingUser) {
      return res.status(400).json(new Message(false, {}, 'Email Exsistes!'));
    }

    user.save(function (err) {
      if (err) {
        debug('error');
        return next(err);
      }
      return res.status(200).json(new Message(true, {}, 'Sign Up Successfully!'));
    });
  });
};

exports.forget = function (req, res, next) {

  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (err) next(err);
    if (!existingUser) {
      return res.status(400).json(new Message(false, {}, 'Email have not been registered!'));
    } else {
      async.waterfall([
        function setRandomToken(done) {
          crypto.randomBytes(16, function (err, buf) {

            var token = buf.toString('hex');
            debug(`token: ${token}`);
            existingUser.passwordResetToken = token;
            existingUser.passwordResetExpires = Date.now() + 3600000;
            existingUser.save(function (err) {
              done(err, token, existingUser);
            });
          });
        },
        function sendForgotPasswordEmail(token, user, done) {
          debug(user.email);
          var transporter = nodemailer.createTransport({
            SES: new aws.SES({
              apiVersion: '2010-12-01',
              region: 'us-west-2',
              accessKeyId: process.env.AWS_SES_KEY,
              secretAccessKey: process.env.AWS_SES_PASS,
              sslEnabled: true,
            })
          });

          var mailOptions = {
            to: user.email,
            from: 'mushrchun@gmail.com',
            subject: 'Reset your password on Snaplab',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please the copy following string and paste it into the form to complete the process:\n\n
          ${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
          };
          transporter.sendMail(mailOptions, function (err) {
            done(err);
          });
        }],
        function (err) {
          if (err) return next(err);
          else {
            res.status(200).json(new Message(true, {}, 'Send reset email Successfully!'));
          }
        }
      );
    }

  });
};

exports.reset = function (req, res, next) {

  async.waterfall([
    function resetPassword(done) {
      User
        .findOne({ passwordResetToken: req.body.token })
        .where('passwordResetExpires').gt(Date.now())
        .exec(function (err, user) {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(400).json(new Message(false, {}, 'Password reset token is invalid or has expired.'));
          }
          user.password = req.body.password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          user.save(function (err) {
            done(err, user);
            debug('reset password successfully');
          });
        });
    },
    function sendResetPasswordEmail(user, done) {
      var transporter = nodemailer.createTransport({
        SES: new aws.SES({
          apiVersion: '2010-12-01',
          region: 'us-west-2',
          accessKeyId: process.env.AWS_SES_KEY,
          secretAccessKey: process.env.AWS_SES_PASS,
          sslEnabled: true,
        })
      });
      var mailOptions = {
        to: user.email,
        from: 'mushrchun@gmail.com',
        subject: 'Your Explorer password has been changed',
        text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
      };
      transporter.sendMail(mailOptions, function (err) {
        if (!err) {
          res.status(200).json(new Message(true, {}, 'Success! Your password has been changed.'));
        } else {
          debug(err);
        }
        done(err);
      });
    }
  ], function (err) {
    if (err) {
      return next(err);
    }
  });
};

exports.updateProfile = function (req, res, next) {
  var id = req.params.id;
  var name = req.body.name;

  // todo: sanitize it in the future
  if (id != undefined && name != undefined) {
    User.update({ _id: id }, { $set: { name: name } }, function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).json(new Message(true, {}, 'Update Profile Successfully(re-login to view the change)!'));
    });
  } else {
    res.status(400).json(new Message(true, {}, 'Fail to Update Profile!'));
  }
};

exports.updatePassword = function (req, res, next) {
  var id = req.params.id;
  var cPassword = req.body.cPassword;
  var nPassword = req.body.nPassword;

  User.findById(id, function (err, user) {
    debug(user);
    user.comparePassword(cPassword, function (err, isMatch) {
      if (err) return next(err);
      if (isMatch) {
        user.password = nPassword;
        user.save(function (err) {
          if (!err) {
            res.status(200).json(new Message(true, {}, 'Update Password Successfully!'));
          }
        });
      } else {
        res.status(400).json(new Message(false, {}, 'Update Password Unsuccessfully!'));
      }
    });
  });
};
