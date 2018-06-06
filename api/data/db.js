var mongoose = require('mongoose');

// DJM: UNIFIED DB change
//var dburl = 'mongodb://' + process.env.IP + ':27017/CDFinance';
var dburl = 'mongodb://TeamGator:G4T0RD3VS@ds147544.mlab.com:47544/gators1';

mongoose.connect(dburl);


mongoose.connection
  .on('connected', function() { console.log(`Mongoose CONNECT OK to ${dburl}`); })
  .on('disconnected', function() { console.log(`Mongoose DISCONNECT OK from ${dburl}`); })
  .on('error', function(err) { console.log(`Mongoose FAIL TO CONNECT to ${dburl} -->${err}`); });

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected through app termination (SIGINT)");
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected through app termination (SIGTERM)");
    process.exit(0);
  });
});

process.once('SIGUSR2', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through app termination (SIGUSR2)');
    process.kill(process.pid, 'SIGUSR2');
  });
});


require('./stocks.model.js');
require('./users.model.js');
