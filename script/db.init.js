var dotenv = require('dotenv');
var mongoose = require('mongoose');
var Counter = require('../model/Counter');
var debug = require('debug')('snaplab-server:server');

dotenv.load({ path: '.env' });
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', function () {
  debug('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

var serialNumber = new Counter({ _id: 'serial-number', seq: 0 });
serialNumber.save(function (err) {
  if (err) {
    debug(err);
  } else {
    debug('done');
  }
});
