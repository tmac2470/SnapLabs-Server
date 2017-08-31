var dotenv = require('dotenv');
var mongoose = require('mongoose');
var Counter = require('../model/Counter');

dotenv.load({ path: '.env' });
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', function () {
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

var serialNumber = new Counter({ _id: 'serial-number', seq: 0 });
serialNumber.save(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('done');
    }
});
