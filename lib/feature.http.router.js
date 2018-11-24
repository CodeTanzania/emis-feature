'use strict';


/**
 * @apiDefine Feature Feature
 *
 * @apiDescription A representation of geographical feature of interest(i.e mapped
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
 * @since  1.0.0
 * @version 1.0.0
 * @public
 */


/**
 * @apiDefine Feature
 * @apiSuccess {String} _id Unique feature identifier
 * @apiSuccess {String} [category=Other] Human readable category(or class) of
 * a feature.
 * @apiSuccess {String} [type=Other] Human readable type of a feature.
 * @apiSuccess {String} [level=other] Human readable administrative level of
 * a feature.
 * @apiSuccess {String} name Human readable name of a feature.
 * @apiSuccess {String} [nickname] Human readable alternative or well known
 * name of a feature.
 * @apiSuccess {String} [about=undefined] A brief summary about a feature if
 * available i.e additional details that clarify what a feature is.
 * @apiSuccess {Point} [centroid=undefined] A geo-point that may be considered
 * as the center of a feature.
 * @apiSuccess {Geometry} geometry A geo-geometry representation of a feature.
 * @apiSuccess {Object} [properties] A map of key value pairs describing
 * (or detailing) characteristics(or traits) of a feature.
 * @apiSuccess {String[]} [tags] A set of human redable keywords describing
 * a feature.
 * @apiSuccess {String} [continent=Africa] Human readable continent where a
 * feature belongs.
 * @apiSuccess {String} [country=Tanzania] Human readable country where a
 * feature belongs.
 * @apiSuccess {Date} createdAt Date when feature was created
 * @apiSuccess {Date} updatedAt Date when feature was last updated
 *
 */


/**
 * @apiDefine Features
 * @apiSuccess {Object[]} data List of features
 * @apiSuccess {String} data._id Unique feature identifier
 * @apiSuccess {String} [data.category=Other] Human readable category(or class)
 * of a feature.
 * @apiSuccess {String} [data.type=Other] Human readable type of a feature.
 * @apiSuccess {String} [level=other] Human readable administrative level of
 * a feature.
 * @apiSuccess {String} data.name Human readable name of a feature.
 * @apiSuccess {String} [data.nickname] Human readable alternative or well known
 * name of a feature.
 * @apiSuccess {String} [data.about=undefined] A brief summary about a feature if
 * available i.e additional details that clarify what a feature is.
 * @apiSuccess {Point} [data.centroid=undefined] A geo-point that may be considered
 * as the center of a feature.
 * @apiSuccess {Geometry} data.geometry A geo-geometry representation of a feature.
 * @apiSuccess {Object} [data.properties] A map of key value pairs describing
 * (or detailing) characteristics(or traits) of a feature.
 * @apiSuccess {String[]} [data.tags] A set of human redable keywords describing
 * a feature.
 * @apiSuccess {String} [data.continent=Africa] Human readable continent where a
 * feature belongs.
 * @apiSuccess {String} [data.country=Tanzania] Human readable country where a
 * feature belongs.
 * @apiSuccess {Date} data.createdAt Date when feature was created
 * @apiSuccess {Date} data.updatedAt Date when feature was last updated
 * @apiSuccess {Number} total Total number of features
 * @apiSuccess {Number} size Number of features returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest feature
 * was last modified
 *
 */


/**
 * @apiDefine FeatureSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "_id": "5b5d92da476363251e13e0f4",
 *   "category": "Building",
 *   "type": "Residential",
 *   "name": "Bedfordshire",
 *   "about": "Labore aut corrupti et. Doloribus animi quidem ratione.",
 *   "geometry": {
 *    "type": "Point",
 *    "coordinates": [-76.80207859497996, 55.69469494228919]
 *   },
 *   "updatedAt": "2018-07-29T10:11:38.110Z",
 *   "createdAt": "2018-07-29T10:11:38.110Z"
 * }
 *
 */


/**
 * @apiDefine FeaturesSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [
 *    {
 *      "_id": "5b5d92da476363251e13e0f4",
 *      "category": "Building",
 *      "type": "Residential",
 *      "name": "Bedfordshire",
 *      "about": "Labore aut corrupti et. Doloribus animi quidem ratione.",
 *      "geometry": {
 *        "type": "Point",
 *        "coordinates": [-76.80207859497996, 55.69469494228919]
 *      },
 *      "updatedAt": "2018-07-29T10:11:38.110Z",
 *      "createdAt": "2018-07-29T10:11:38.110Z"
 *    }
 *   ],
 *   "total": 20,
 *   "size": 10,
 *   "limit": 10,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 2,
 *   "lastModified": "2018-07-29T10:11:38.111Z"
 * }
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { getString } = require('@lykmapipo/env');
const Router = require('@lykmapipo/express-common').Router;


/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/features/:id';
const PATH_LIST = '/features';
const PATH_SCHEMA = '/features/schema/';


/* declarations */
const Feature = require(path.join(__dirname, 'feature.model'));
const router = new Router({
  version: API_VERSION
});


/**
 * @api {get} /features List Features
 * @apiVersion 1.0.0
 * @apiName GetFeatures
 * @apiGroup Feature
 * @apiDescription Returns a list of features
 * @apiUse RequestHeaders
 * @apiUse Features
 *
 * @apiUse RequestHeadersExample
 * @apiUse FeaturesSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getFeatures(request, response, next) {

  // obtain request options
  const options = _.merge({}, request.mquery);

  Feature
    .get(options, function onGetFeatures(error, results) {

      // forward error
      if (error) {
        next(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(results);
      }

    });

});


/**
 * @api {get} /features/schema Get Feature Schema
 * @apiVersion 1.0.0
 * @apiName GetFeatureSchema
 * @apiGroup Feature
 * @apiDescription Returns feature json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, function getSchema(request, response) {
  const schema = Feature.jsonSchema();
  response.status(200);
  response.json(schema);
});


/**
 * @api {post} /features Create New Feature
 * @apiVersion 1.0.0
 * @apiName PostFeature
 * @apiGroup Feature
 * @apiDescription Create new feature
 * @apiUse RequestHeaders
 * @apiUse Feature
 *
 * @apiUse RequestHeadersExample
 * @apiUse FeatureSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postFeature(request, response, next) {

  // obtain request body
  const body = _.merge({}, request.body);

  Feature
    .post(body, function onPostFeature(error, created) {

      // forward error
      if (error) {
        next(error);
      }

      // handle response
      else {
        response.status(201);
        response.json(created);
      }

    });

});


/**
 * @api {get} /features/:id Get Existing Feature
 * @apiVersion 1.0.0
 * @apiName GetFeature
 * @apiGroup Feature
 * @apiDescription Get existing feature
 * @apiUse RequestHeaders
 * @apiUse Feature
 *
 * @apiUse RequestHeadersExample
 * @apiUse FeatureSuccessResponse
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getFeature(request, response, next) {

  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain feature id
  options._id = request.params.id;

  Feature
    .getById(options, function onGetFeature(error, found) {

      // forward error
      if (error) {
        next(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(found);
      }

    });

});


/**
 * @api {patch} /features/:id Patch Existing Feature
 * @apiVersion 1.0.0
 * @apiName PatchFeature
 * @apiGroup Feature
 * @apiDescription Patch existing feature
 * @apiUse RequestHeaders
 * @apiUse Feature
 *
 * @apiUse RequestHeadersExample
 * @apiUse FeatureSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchFeature(request, response, next) {

  // obtain feature id
  const _id = request.params.id;

  // obtain request body
  const patches = _.merge({}, request.body);

  Feature
    .patch(_id, patches, function onPatchFeature(error, patched) {

      // forward error
      if (error) {
        next(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(patched);
      }

    });

});


/**
 * @api {put} /features/:id Put Existing Feature
 * @apiVersion 1.0.0
 * @apiName PutFeature
 * @apiGroup Feature
 * @apiDescription Put existing feature
 * @apiUse RequestHeaders
 * @apiUse Feature
 *
 * @apiUse RequestHeadersExample
 * @apiUse FeatureSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putFeature(request, response, next) {

  // obtain feature id
  const _id = request.params.id;

  // obtain request body
  const updates = _.merge({}, request.body);

  Feature
    .put(_id, updates, function onPutFeature(error, updated) {

      // forward error
      if (error) {
        next(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(updated);
      }

    });

});


/**
 * @api {delete} /features/:id Delete Existing Feature
 * @apiVersion 1.0.0
 * @apiName DeleteFeature
 * @apiGroup Feature
 * @apiDescription Delete existing feature
 * @apiUse RequestHeaders
 * @apiUse Feature
 *
 * @apiUse RequestHeadersExample
 * @apiUse FeatureSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteFeature(request, response, next) {

  // obtain feature id
  const _id = request.params.id;

  // obtain request body
  const patches = _.merge({}, { deletedAt: new Date() });

  Feature
    .patch(_id, patches, function onDeleteFeature(error, deleted) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(deleted);
      }

    });

});


/* expose feature router */
module.exports = router;
