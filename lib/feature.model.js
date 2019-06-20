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
 * @since 1.0.0
 * @version 0.1.0
 * @public
 */

/* dependencies */
const _ = require('lodash');
const { getString } = require('@lykmapipo/env');
const {
  Schema,
  model,
  SCHEMA_OPTIONS,
  copyInstance,
} = require('@lykmapipo/mongoose-common');
const { Point, Geometry, centroidOf } = require('mongoose-geojson-schemas');
const {
  CONTINENT_NAMES,
  COUNTRY_NAMES,
  MAP_FEATURE_DEFAULT_NATURE,
  MAP_FEATURE_NATURES,
  MAP_FEATURE_DEFAULT_FAMILY,
  MAP_FEATURE_FAMILIES,
  MAP_FEATURE_DEFAULT_TYPE,
  MAP_FEATURE_TYPES,
} = require('@lykmapipo/constants');
const actions = require('mongoose-rest-actions');

/* defaults */
const DEFAULT_CONTINENT_NAME = getString('DEFAULT_CONTINENT_NAME', 'Africa');
const DEFAULT_COUNTRY_NAME = getString('DEFAULT_COUNTRY_NAME', 'Tanzania');

/* schema options*/
const FEATURE_MODEL_NAME = getString('FEATURE_MODEL_NAME', 'Feature');
const FEATURE_COLLECTION_NAME = getString(
  'FEATURE_COLLECTION_NAME',
  'features'
);

/**
 * @name FeatureSchema
 * @type {Schema}
 * @since 1.0.0
 * @version 0.1.0
 * @private
 */
const FeatureSchema = new Schema(
  {
    /**
     * @name nature
     * @description Human readable nature of a feature.
     *
     * It may have one by one relationship with OSM primary features tag key.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * Boundary, Building, Highway, Waterway etc.
     */
    nature: {
      type: String,
      trim: true,
      required: true,
      enum: MAP_FEATURE_NATURES,
      index: true,
      searchable: true,
      taggable: true,
      default: MAP_FEATURE_DEFAULT_NATURE,
      fake: true,
    },

    /**
     * @name family
     * @description Human readable family of a feature.
     *
     * It may have one by one relationship with OSM primary features tag value.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * Road, Station, Stop etc.
     */
    family: {
      type: String,
      trim: true,
      required: true,
      enum: MAP_FEATURE_FAMILIES,
      index: true,
      searchable: true,
      taggable: true,
      default: MAP_FEATURE_DEFAULT_FAMILY,
      fake: true,
    },

    /**
     * @name type
     * @description Human readable type of a feature.
     *
     * It may have one by one relationship with OSM primary features type(s) or
     * specific per use case to allow use of own convections or standards on
     * identifying geographical features.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * Region, Health Centre etc.
     */
    type: {
      type: String,
      trim: true,
      enum: MAP_FEATURE_TYPES,
      index: true,
      searchable: true,
      taggable: true,
      default: MAP_FEATURE_DEFAULT_TYPE,
      fake: true,
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
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * Jangwani
     */
    name: {
      type: String,
      trim: true,
      required: true,
      index: true,
      searchable: true,
      taggable: true,
      fake: {
        generator: 'address',
        type: _.sample(['city', 'county', 'streetName', 'state']),
      },
    },

    /**
     * @name nickname
     * @description Human readable alternative or well known name of a feature.
     *
     * Apply when an alternative name exists, e.g., a street name may have
     * different syntax, sometimes even on street signs, although it is not only
     * for street names.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * Msimbazi
     */
    nickname: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      taggable: true,
      fake: {
        generator: 'address',
        type: _.sample(['city', 'county', 'streetName', 'state']),
      },
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
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * Lower Msimbazi Valley
     */
    about: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'lorem',
        type: 'sentence',
      },
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
     * @since 1.0.0
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
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *    type: 'Point',
     *    coordinates: [-76.80207859497996, 55.69469494228919]
     * }
     */
    geometry: Geometry,

    /**
     * @name properties
     * @description A map of key value pairs describing(or detailing)
     * characteristics(or traits) of a feature.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "boundary": "administrative",
     *   "width": "4m"
     * }
     */
    properties: {
      type: Map,
      of: String,
      index: true,
      taggable: true,
      fake: {
        generator: 'helpers',
        type: 'createTransaction',
      },
    },

    /**
     * @name place
     * @description A map of key value pairs describing a place where
     * a feature is(or belongs).
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 1.2.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "continent": "Africa",
     *   "country": "Tanzania"
     * }
     */
    place: {
      type: Map,
      of: String,
      index: true,
      taggable: true,
      default: {
        continent: DEFAULT_CONTINENT_NAME,
        country: DEFAULT_COUNTRY_NAME,
      },
      fake: true,
    },
  },
  SCHEMA_OPTIONS
);

// TODO ensure indexes on places/admin levels

/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */

/**
 * @name validate
 * @description feature schema pre validation hook
 * @param {function} done callback to invoke on success or error
 * @since 1.0.0
 * @version 0.1.0
 * @private
 */
FeatureSchema.pre('validate', function(done) {
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
 * @description feature schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 * @since 1.0.0
 * @version 0.1.0
 * @instance
 */
FeatureSchema.methods.preValidate = function preValidate(done) {
  // ensure centroid of feature geometry
  if (this.geometry) {
    this.centroid = centroidOf(this.geometry);
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

FeatureSchema.statics.DEFAULT_NATURE = MAP_FEATURE_DEFAULT_NATURE;
FeatureSchema.statics.NATURES = MAP_FEATURE_NATURES;

FeatureSchema.statics.DEFAULT_FAMILY = MAP_FEATURE_DEFAULT_FAMILY;
FeatureSchema.statics.FAMILIES = MAP_FEATURE_FAMILIES;

FeatureSchema.statics.DEFAULT_TYPE = MAP_FEATURE_DEFAULT_TYPE;
FeatureSchema.statics.TYPES = MAP_FEATURE_TYPES;

FeatureSchema.statics.DEFAULT_CONTINENT_NAME = DEFAULT_CONTINENT_NAME;
FeatureSchema.statics.CONTINENTS = CONTINENT_NAMES;

FeatureSchema.statics.DEFAULT_COUNTRY_NAME = DEFAULT_COUNTRY_NAME;
FeatureSchema.statics.COUNTRIES = COUNTRY_NAMES;

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description prepare feature seeding upsert criteria
 * @param {Object} seed plain object feature seed
 * @return {Object} criteria used to upsert feature
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.5.0
 * @version 0.1.0
 * @public
 */
FeatureSchema.statics.prepareSeedCriteria = seed => {
  // prepare feature upsert criteria by _id or fields
  let criteria = copyInstance(seed);
  /* jshint ignore:start */
  criteria = criteria._id
    ? _.pick(criteria, '_id')
    : _.pick(criteria, 'nature', 'family', 'type', 'name');
  /* jshint ignore:end */
  // return feature upsert criteria
  return criteria;
};

/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */

/* use mongoose rest actions*/
FeatureSchema.plugin(actions);

/* export feature model */
module.exports = exports = model(FEATURE_MODEL_NAME, FeatureSchema);
