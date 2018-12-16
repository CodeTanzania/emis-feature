'use strict';


/* ensure mongodb uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/emis-feature');


/* dependencies */
const path = require('path');
const async = require('async');
const { include } = require('@lykmapipo/include');
const { connect } = require('@lykmapipo/mongoose-common');
const { Feature, info, app } = include(__dirname, '..');


// establish mongodb connection
connect((error) => {

  // seed features
  Feature.seed((error, results) => {

    // expose module info
    app.get('/', (request, response) => {
      response.status(200);
      response.json(info);
    });

    // fire the app
    app.start((error, env) => {
      console.log(`visit http://0.0.0.0:${env.PORT}`);
    });

  });

});
