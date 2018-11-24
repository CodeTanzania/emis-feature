'use strict';


/**
 * @module Feature
 * @name Feature
 * @description A representation of geographical feature of interest(i.e mapped
 * physical element with their attributes in landscape e.g. administrative
 * boundaries, roads, buildings etc) both natural and man made used in
 * emergency(or disaster) management(or event).
 *
 * @see {@link https://en.wikipedia.org/wiki/Geographic_information_system}
 * @see {@link https://tools.ietf.org/html/rfc7946#section-6}
 * @see {@link https://wiki.openstreetmap.org/wiki/Features}
 * @see {@link https://wiki.openstreetmap.org/wiki/Map_Features}
 * @see {@link https://docs.mongodb.com/manual/reference/geojson/}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 *
 * const { app } = require('@codetanzania/emis-feature');
 * app.start((error, env) => {...});
 *
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const app = require('@lykmapipo/express-common');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];


/* extract information from package.json */
const info = _.merge({}, _.pick(pkg, fields));


/* export package(module) info */
exports.info = info;


/* import models */
const Feature = require(path.join(__dirname, 'lib', 'feature.model'));


/* export models */
exports.Feature = Feature;


/* import routers*/
const featureRouter =
  require(path.join(__dirname, 'lib', 'feature.http.router'));


/* export feature router */
exports.apiVersion = featureRouter.apiVersion;
exports.featureRouter = featureRouter;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {
    /* @todo bind oauth middlewares authenticate, token, authorize */
    app.mount(featureRouter);
    return app;
  }
});
