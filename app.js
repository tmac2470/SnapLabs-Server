/*eslint no-unused-consts: [2, {"args": "none", "constsIgnorePattern": "next"}]*/

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Message = require('./utils/util').Message;
const debug = require('debug')('snaplab-server:app');
dotenv.load({ path: '.env' });
const passport = require('./config/passport');
const investigations = require('./routes/investigations');
const auth = require('./routes/authentication');
const profiles = require('./routes/profiles');
const results = require('./routes/result');
const cors = require('cors');

/**
 * Connect to MongoDB
 */
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
mongoose.connection.on('error', () => {
  debug('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

const app = express();

// // Allow cors for localhost
// var corsOptions = {
//   origin: 'http://localhost:8100',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// Allow all cors
app.use(cors());

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/experiments', investigations);
app.use('/auth', auth);
app.use('/profiles', profiles);
app.use('/results', results);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json(new Message(false, {}, 'Not Found'));
});

// error handler
app.use((err, req, res, next) => {

  // render the error page
  res.status(err.status || 500);
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json(new Message(false, {}, err.name + ': ' + err.message));
  } else {
    debug(err);
    res.json(new Message(false, {}, 'Internal Error'));
  }
});

module.exports = app;
