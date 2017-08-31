'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var Message = require('./utils/util').Message;
var debug = require('debug')('snaplab-server:app');
dotenv.load({ path: '.env' });
var passport = require('./config/passport');
var experiments = require('./routes/experiments');
var auth = require('./routes/authentication');
var profiles = require('./routes/profiles');


/**
 * Connect to MongoDB
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', function () {
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

var app = express();


app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/experiments', experiments);
app.use('/auth', auth);
app.use('/profiles', profiles);

// catch 404 and forward to error handler
app.use(function (req, res) {
    res.status(404).json(new Message(false, {}, 'Not Found'));
});

// error handler
app.use(function (err, req, res, next) {

    // render the error page
    res.status(err.status || 500);
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json(new Message(false, {}, err.name + ": " + err.message));
    } else {
        debug(err);
        res.json(new Message(false, {}, 'Internal Error'));
    }
});

module.exports = app;
