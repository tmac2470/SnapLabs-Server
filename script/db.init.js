const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Counter = require('../model/Counter');
const debug = require('debug')('snaplab-server:server');

dotenv.load({ path: '.env' });
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', () => {
  debug('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

const serialNumber = new Counter({ _id: 'serial-number', seq: 0 });
serialNumber.save((err) => {
  if (err) {
    debug(err);
  } else {
    debug('done');
  }
});
