'use strict';


/* ensure mongodb uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/emis-feature');


/* dependencies */
const path = require('path');
const async = require('async');
const mongoose = require('mongoose');
const {
  Feature,
  info,
  app
} = require(path.join(__dirname, '..'));


/* establish mongodb connection */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


Feature.seed((error, results) => {

  /* expose module info */
  app.get('/', function (request, response) {
    response.status(200);
    response.json(info);
  });

  /* fire the app */
  app.start(function (error, env) {
    console.log(`visit http://0.0.0.0:${env.PORT}`);
  });

});
