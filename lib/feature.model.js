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
 */


/* dependencies */
const _ = require('lodash');
const mongoose = require('mongoose-valid8');
const actions = require('mongoose-rest-actions');
const { Point, Geometry, centroidOf } = require('mongoose-geojson-schemas');
const { getString, getStrings } = require('@lykmapipo/env');
const { Schema } = mongoose;


/* constants */
const FEATURE_MODEL_NAME = getString('FEATURE_MODEL_NAME', 'Feature');
const FEATURE_COLLECTION_NAME = getString('FEATURE_COLLECTION_NAME', 'features');
const DEFAULT_FEATURE_CATEGORY =
  getString('DEFAULT_FEATURE_CATEGORY', 'Unknown');
const FEATURE_CATEGORIES =
  getStrings('FEATURE_CATEGORIES', DEFAULT_FEATURE_CATEGORY);
const DEFAULT_FEATURE_TYPE = getString('DEFAULT_FEATURE_TYPE', 'Unknown');
const FEATURE_TYPES = getStrings('FEATURE_TYPES', DEFAULT_FEATURE_TYPE);
const SCHEMA_OPTIONS = ({
  timestamps: true,
  emitIndexErrors: true,
  collection: FEATURE_COLLECTION_NAME
});


/**
 * @name FeatureSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const FeatureSchema = new Schema({
  /**
   * @name category
   * @description Human readable category(or class) of a feature.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * Boundary, Building, Highway, Waterway etc.
   */
  category: {
    type: String,
    trim: true,
    enum: FEATURE_CATEGORIES,
    index: true,
    searchable: true,
    fake: true
  },


  /**
   * @name type
   * @description Human readable type of a feature.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * Boundary, Building, Highway, Waterway etc.
   */
  type: {
    type: String,
    trim: true,
    enum: FEATURE_TYPES,
    index: true,
    searchable: true,
    fake: true
  },


  /**
   * @name name
   * @description Human readable name of a feature.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * Dignissimos.
   */
  name: {
    type: String,
    trim: true,
    required: true,
    index: true,
    // unique: true,
    searchable: true,
    fake: {
      generator: 'lorem',
      type: 'word'
    }
  },


  /**
   * @name nickname
   * @description Human readable alternative or well known name of a feature.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * Molestias.
   */
  nickname: {
    type: String,
    trim: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'lorem',
      type: 'word'
    }
  },


  /**
   * @name about
   * @description A brief summary about a feature if available i.e
   * additional details that clarify what a feature is.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * Et est molestias vero dignissimos quod rerum.
   */
  about: {
    type: String,
    trim: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'lorem',
      type: 'paragraph'
    }
  },


  /**
   * @name centroid
   * @description A geo-point that may be considered as the center of a feature.
   *
   * @type {object}
   * @property {object} cetroid - geo json point
   * @property {string} cetroid.type - Point
   * @property {number[]} cetroid.coordinates - longitude, latitude pair of
   * the geo point
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * {
   *    type: 'Point',
   *    coordinates: [-76.80207859497996, 55.69469494228919]
   * }
   */
  centroid: Point,


  /**
   * @name centroid
   * @description A geo-geometry representation of a feature.
   *
   * @type {object}
   * @property {object} geomentry - geojson geometry
   * @property {string} geometry.type - geojson geometry type
   * @property {number[]} geometry.coordinates - coordinates pair(s) of a
   * geometry
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * {
   *    type: 'Point',
   *    coordinates: [-76.80207859497996, 55.69469494228919]
   * }
   */
  geometry: Geometry,

}, SCHEMA_OPTIONS);


/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */


/**
 * @name validate
 * @description party schema pre validation hook
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
FeatureSchema.pre('validate', function (done) {

  this.preValidate(done);

});


/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */


/**
 * @name preValidate
 * @function preValidate
 * @description party schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
FeatureSchema.methods.preValidate = function preValidate(done) {

  // ensure feature category
  if (_.isEmpty(this.category) && !_.isEmpty(DEFAULT_FEATURE_CATEGORY)) {
    this.category = DEFAULT_FEATURE_CATEGORY;
  }

  // ensure feature type
  if (_.isEmpty(this.type) && !_.isEmpty(DEFAULT_FEATURE_TYPE)) {
    this.type = DEFAULT_FEATURE_TYPE;
  }

  // ensure centroid of feature geometry
  if (this.geometry) {
    const centroid = centroidOf(this.geometry);
    if (centroid) {
      this.centroid = centroid;
    }
  }

  // continue
  done();

};


/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */


/* static constants */
FeatureSchema.statics.MODEL_NAME = FEATURE_MODEL_NAME;
FeatureSchema.statics.COLLECTION_NAME = FEATURE_COLLECTION_NAME;

FeatureSchema.statics.DEFAULT_FEATURE_CATEGORY = DEFAULT_FEATURE_CATEGORY;
FeatureSchema.statics.FEATURE_CATEGORIES = FEATURE_CATEGORIES;

FeatureSchema.statics.DEFAULT_FEATURE_TYPE = DEFAULT_FEATURE_TYPE;
FeatureSchema.statics.FEATURE_TYPES = FEATURE_TYPES;


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* use mongoose rest actions*/
FeatureSchema.plugin(actions);


/* export party model */
module.exports = mongoose.model(FEATURE_MODEL_NAME, FeatureSchema);
