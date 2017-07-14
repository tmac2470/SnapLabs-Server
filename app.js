var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');


dotenv.load({ path: '.env' });
var passport = require('./config/passport');
var experiments = require('./routes/experiments');
var auth = require('./routes/authentication');


/**
 * Connect to MongoDB
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', function(){
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/experiments', experiments);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

    console.log(err);

  // render the error page
  res.status(err.status || 500);
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }else{
        res.json('internal error');
    }
});

module.exports = app;
