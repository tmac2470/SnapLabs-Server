const passport = require('passport');
const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const debug = require('debug')('snaplab-server:controller');
const aws = require('aws-sdk');
const Message = require('../bean/message');
const User = require('../model/User');


exports.signIn = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      const token = user.generateJwt();
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

exports.signUp = (req, res, next) => {

  const extractedName = req.body.email.split('@')[0];

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    name: extractedName
  });

  User
    .findOne({ email: req.body.email })
    .exec((err, existingUser) => {
      if (err) next(err);
      if (existingUser) {
        return res.status(400).json(new Message(false, {}, 'Email Exsistes!'));
      }

      user.save((err) => {
        if (err) {
          debug('error');
          return next(err);
        }
        return res.status(200).json(new Message(true, {}, 'Sign Up Successfully!'));
      });
    });
};

exports.forget = (req, res, next) => {

  const createRandomToken = crypto
    .randomBytesAsync(16)
    .then(buf => buf.toString('hex'));

  const setRandomToken = token => {
    return User
      .findOne({ email: req.body.email })
      .then((existingUser) => {
        if (!existingUser) {
          return res.status(400).json(new Message(false, {}, 'Email have not been registered!'));
        } else {
          debug(`token: ${token}`);
          const now = Date.now();
          if(existingUser.passwordResetExpires - now > 3540000) {
            res.status(400).json(new Message(false, {}, 'Too frequently to get the reset token! Wait for 1 min please'));
            return;
          }
          existingUser.passwordResetToken = token;
          existingUser.passwordResetExpires = now + 3600000;
          existingUser = existingUser.save();
        }
        return existingUser;
      });
  };

  const sendForgtoPasswordEmail = (user) => {
    if (!user) { return; }
    debug(user.email);
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-west-2',
        accessKeyId: process.env.AWS_SES_KEY,
        secretAccessKey: process.env.AWS_SES_PASS,
        sslEnabled: true,
      })
    });

    const mailOptions = {
      to: user.email,
      from: 'admin@snaplabs.online',
      subject: 'Reset your password on Snaplab',
      text:
      `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please the copy following string and paste it into the form to complete the process:\n\n
        ${user.passwordResetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {
        res.status(200).json(new Message(true, {}, 'Send reset email Successfully!'));
      });
  };

  createRandomToken
    .then(setRandomToken)
    .then(sendForgtoPasswordEmail)
    .catch(next);

};

exports.reset = (req, res, next) => {

  const resetPassword = () => {
    return User
      .findOne({ passwordResetToken: req.body.token })
      .where('passwordResetExpires').gt(Date.now())
      .then((user) => {
        if (!user) {
          return res.status(400).json(new Message(false, {}, 'Password reset token is invalid or has expired.'));
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        return user.save();
      });
  };

  const sendResetPasswordEmail = (user) => {
    if(!user) return;
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-west-2',
        accessKeyId: process.env.AWS_SES_KEY,
        secretAccessKey: process.env.AWS_SES_PASS,
        sslEnabled: true,
      })
    });
    const mailOptions = {
      to: user.email,
      from: 'admin@snaplabs.online',
      subject: 'Your Explorer password has been changed',
      text:
        `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {
        res.status(200).json(new Message(true, {}, 'Success! Your password has been changed.'));
      });
  };

  resetPassword()
    .then(sendResetPasswordEmail)
    .catch(err => next(err));

};

exports.updateProfile = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;

  // todo: sanitize it in the future
  if (id != undefined && name != undefined) {
    User
      .update({ _id: id }, { $set: { name: name } })
      .exec((err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json(new Message(true, {}, 'Update Profile Successfully(re-login to view the change)!'));
      });
  } else {
    res.status(400).json(new Message(true, {}, 'Fail to Update Profile!'));
  }
};

exports.updatePassword = (req, res, next) => {
  const id = req.params.id;
  const cPassword = req.body.cPassword;
  const nPassword = req.body.nPassword;

  User
    .findById(id)
    .exec((err, user) => {
      debug(user);
      user.comparePassword(cPassword, (err, isMatch) => {
        if (err) return next(err);
        if (isMatch) {
          user.password = nPassword;
          user.save((err) => {
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
