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
const path = require('path');
const _ = require('lodash');
const async = require('async');
const traverse = require('traverse');
const mongoose = require('mongoose-valid8');
const actions = require('mongoose-rest-actions');
const { extract: extractKeywords } = require('keyword-extractor');
const { continents, countries } = require('countries-list');
const { Point, Geometry, centroidOf } = require('mongoose-geojson-schemas');
const { getString, getStrings } = require('@lykmapipo/env');
const { Schema } = mongoose;
const { Mixed } = Schema.Types;


/* continents */
const DEFAULT_CONTINENT_NAME = getString('DEFAULT_CONTINENT_NAME', 'Africa');
const CONTINENTS = _.orderBy(_.uniq(_.compact(_.values(continents))));


/* countries */
const DEFAULT_COUNTRY_NAME = getString('DEFAULT_COUNTRY_NAME', 'Tanzania');
const COUNTRIES = _.orderBy(_.uniq(_.compact(_.map(countries, 'name'))));


/* admininstrative levels */
const ADMIN_LEVEL_3_NAME = getString('ADMIN_LEVEL_3_NAME', 'zone');
const ADMIN_LEVEL_4_NAME = getString('ADMIN_LEVEL_4_NAME', 'region');
const ADMIN_LEVEL_5_NAME = getString('ADMIN_LEVEL_5_NAME', 'district');
const ADMIN_LEVEL_6_NAME = getString('ADMIN_LEVEL_6_NAME', 'division');
const ADMIN_LEVEL_7_NAME = getString('ADMIN_LEVEL_7_NAME', 'ward');
const ADMIN_LEVEL_8_NAME = getString('ADMIN_LEVEL_8_NAME', undefined);
const ADMIN_LEVEL_9_NAME = getString('ADMIN_LEVEL_9_NAME', 'village');
const ADMIN_LEVEL_10_NAME = getString('ADMIN_LEVEL_10_NAME', 'shina');
const ADMIN_LEVEL_11_NAME = getString('ADMIN_LEVEL_11_NAME', undefined);
const ADMIN_LEVEL_NAMES = _.uniq(_.compact([
  ADMIN_LEVEL_3_NAME, ADMIN_LEVEL_4_NAME, ADMIN_LEVEL_5_NAME,
  ADMIN_LEVEL_6_NAME, ADMIN_LEVEL_7_NAME, ADMIN_LEVEL_8_NAME,
  ADMIN_LEVEL_9_NAME, ADMIN_LEVEL_10_NAME, ADMIN_LEVEL_11_NAME,
]));


/* categories */
const DEFAULT_CATEGORY = getString('DEFAULT_FEATURE_CATEGORY', 'Other');
const CATEGORIES =
  _.orderBy(_.uniq(_.compact(getStrings('FEATURE_CATEGORIES', [
    'Aerialway', 'Aeroway', 'Amenity',
    'Barrier', 'Boundary', 'Building',
    'Craft', 'Emergency', 'Geological',
    'Highway', 'Historic', 'Landuse',
    'Leisure', 'Man made', 'Military',
    'Natural', 'Office', 'Place',
    'Power', 'Public', 'Transport',
    'Railway', 'Route', 'Shop',
    'Sport', 'Telecom', 'Tourism', 'Waterway',
    DEFAULT_CATEGORY
  ]))));


/* feature types */
const DEFAULT_TYPE = getString('DEFAULT_FEATURE_TYPE', 'Other');
const TYPES =
  _.orderBy(_.uniq(_.compact(getStrings('FEATURE_TYPES', [
    'Sustenance', 'Education', 'Transportation',
    'Financial', 'Healthcare', 'Entertainment',
    'Arts', 'Culture', 'Linear Barriers',
    'Access Control', 'Accommodation', 'Commercial',
    'Religious', 'Civic', 'Warehouse',
    'Medical Rescue', 'Firefighters', 'Lifeguards',
    'Assembly Point', 'Roads', 'Link Roads',
    'Paths', 'Lifecycle', 'Vegetation',
    'Water', 'Landform', 'Tracks',
    'Stations', 'Stops', 'Watercourses',
    'Waterways', 'Facilities', DEFAULT_TYPE
  ]))));


/* schema options*/
const FEATURE_MODEL_NAME = getString('FEATURE_MODEL_NAME', 'Feature');
const FEATURE_COLLECTION_NAME =
  getString('FEATURE_COLLECTION_NAME', 'features');
const FEATURE_SEED = getString('FEATURE_SEED', 'features');
const SCHEMA_OPTIONS = ({
  timestamps: true,
  emitIndexErrors: true,
  collection: FEATURE_COLLECTION_NAME
});


/**
 * @name FeatureSchema
 * @type {Schema}
 * @since 1.0.0
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
   * @property {boolean} required - mark required
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} default - default value set when none provided
   * @property {object} fake - fake data generator options
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   * Boundary, Building, Highway, Waterway etc.
   */
  category: {
    type: String,
    trim: true,
    required: true,
    enum: CATEGORIES,
    index: true,
    searchable: true,
    default: DEFAULT_CATEGORY,
    fake: true
  },


  /**
   * @name type
   * @description Human readable type of a feature.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} default - default value set when none provided
   * @property {object} fake - fake data generator options
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   * Road, Station, Stop etc.
   */
  type: {
    type: String,
    trim: true,
    required: true,
    enum: TYPES,
    index: true,
    searchable: true,
    default: DEFAULT_TYPE,
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
    fake: {
      generator: 'address',
      type: _.sample(['city', 'county', 'streetName', 'state'])
    }
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
    fake: {
      generator: 'address',
      type: _.sample(['city', 'county', 'streetName', 'state'])
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
      type: 'sentence'
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
    of: Mixed,
    index: true,
    fake: {
      generator: 'helpers',
      type: 'userCard'
    }
  },


  /**
   * @name tags
   * @description A set of human redable keywords describing a feature.
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
   * {
   *   "boundary": "administrative",
   *   "width": "4m"
   * }
   */
  tags: {
    type: [String],
    index: true,
    searchable: true
  },


  /**
   * @name continent
   * @description Human readable continent where a feature belongs.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} default - default value set when none provided
   * @property {object} fake - fake data generator options
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   * Africa.
   */
  continent: {
    type: String,
    trim: true,
    required: true,
    enum: CONTINENTS,
    index: true,
    searchable: true,
    default: DEFAULT_CONTINENT_NAME,
    fake: true
  },


  /**
   * @name country
   * @description Human readable country where a feature belongs.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} default - default value set when none provided
   * @property {object} fake - fake data generator options
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   * Tanzania
   */
  country: {
    type: String,
    trim: true,
    required: true,
    enum: COUNTRIES,
    index: true,
    searchable: true,
    default: DEFAULT_COUNTRY_NAME,
    fake: true
  }

}, SCHEMA_OPTIONS);

/* dynamical add admin levels schema definitions */
_.forEach(ADMIN_LEVEL_NAMES, function addAdminLevelSchemaField(adminLevel) {
  FeatureSchema.add({
    [adminLevel]: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'address',
        type: _.sample(['city', 'county', 'streetName', 'state'])
      }
    }
  });
});


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
 * @description feature schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 * @since 1.0.0
 * @version 0.1.0
 * @instance
 */
FeatureSchema.methods.preValidate = function preValidate(done) {

  // ensure centroid of feature geometry
  if (this.geometry) {
    const centroid = centroidOf(this.geometry);
    if (centroid) {
      this.centroid = centroid;
    }
  }

  // derive feature tags(refactor)

  // 1. pick from direct fields
  let tags = [
    this.category, this.type, this.name,
    this.nickname, this.about, this.continent,
    this.country
  ];

  // 2. pick from administrative levels
  tags = [...tags].concat(_.values(_.pick(this, ADMIN_LEVEL_NAMES)));

  // 3. pick from properties
  if (this.properties) {
    const properties = _.merge({}, this.properties.toJSON());
    traverse(properties).forEach(function (value) {
      if (_.isString(value)) {
        tags = [...tags].concat(value);
      }
    });
  }

  // 4. extract keywords
  tags = _.uniq(_.compact([...this.tags].concat(tags)));
  tags = extractKeywords(tags.join(' '));

  // 5. set tags
  this.tags = _.uniq(_.compact([...this.tags].concat(tags)));

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

FeatureSchema.statics.DEFAULT_CATEGORY = DEFAULT_CATEGORY;
FeatureSchema.statics.CATEGORIES = CATEGORIES;

FeatureSchema.statics.DEFAULT_TYPE = DEFAULT_TYPE;
FeatureSchema.statics.TYPES = TYPES;

FeatureSchema.statics.DEFAULT_CONTINENT_NAME = DEFAULT_CONTINENT_NAME;
FeatureSchema.statics.CONTINENTS = CONTINENTS;

FeatureSchema.statics.DEFAULT_COUNTRY_NAME = DEFAULT_COUNTRY_NAME;
FeatureSchema.statics.COUNTRIES = COUNTRIES;

FeatureSchema.statics.ADMIN_LEVEL_3_NAME = ADMIN_LEVEL_3_NAME;
FeatureSchema.statics.ADMIN_LEVEL_4_NAME = ADMIN_LEVEL_4_NAME;
FeatureSchema.statics.ADMIN_LEVEL_5_NAME = ADMIN_LEVEL_5_NAME;
FeatureSchema.statics.ADMIN_LEVEL_6_NAME = ADMIN_LEVEL_6_NAME;
FeatureSchema.statics.ADMIN_LEVEL_7_NAME = ADMIN_LEVEL_7_NAME;
FeatureSchema.statics.ADMIN_LEVEL_8_NAME = ADMIN_LEVEL_8_NAME;
FeatureSchema.statics.ADMIN_LEVEL_9_NAME = ADMIN_LEVEL_9_NAME;
FeatureSchema.statics.ADMIN_LEVEL_10_NAME = ADMIN_LEVEL_10_NAME;
FeatureSchema.statics.ADMIN_LEVEL_11_NAME = ADMIN_LEVEL_11_NAME;
FeatureSchema.statics.ADMIN_LEVEL_NAMES = ADMIN_LEVEL_NAMES;


/**
 * @name upsert
 * @function upsert
 * @description create or update existing feature
 * @param {Object} feature valid feature details
 * @param {Function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 * @public
 */
FeatureSchema.statics.upsert = function upsert(feature, done) {

  //normalize arguments
  let _feature = (
    _.isFunction(feature.toObject) ?
    feature.toObject() :
    feature
  );

  //refs
  const Feature = this;

  // prepare upsert
  async.waterfall([

    function findExistingFeature(next) {
      // prepare criteria by _id or fields
      let criteria = _.merge({}, _feature);
      criteria = (
        criteria._id ?
        _.pick(criteria, '_id') :
        _.pick(criteria, 'category', 'type', 'name')
      );
      Feature.findOne(criteria, next);
    },

    function upsertFeature(found, next) {
      // instantiate if not found
      if (!found) {
        found = new Feature(_feature);
      }

      // prepare updates
      _feature = _.merge({}, _feature, found.toObject());

      // do upsert
      found.updatedAt = new Date();
      found.put(_feature, next);
    }
  ], done);
};


/**
 * @name seed
 * @function seed
 * @description seed features into database, on duplicate existing wins
 * on merging.
 * @param {Feature[]} [features] set of feature(s) to seed
 * @param {Function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 * @public
 */
FeatureSchema.statics.seed = function seed(seeds, done) {

  // normalize arguments
  let _seeds = _.isFunction(seeds) ? [] : [].concat(seeds);
  const _done = _.isFunction(seeds) ? seeds : done;

  // refs
  const Feature = this;

  // init features collection
  let features = [];

  // try load seeds from environment
  const BASE_PATH = getString('BASE_PATH', process.cwd());
  const SEEDS_PATH = getString('SEEDS_PATH', path.join(BASE_PATH, 'seeds'));
  const SEED_PATH = path.join(SEEDS_PATH, FEATURE_SEED);
  try {
    const seed = require(SEED_PATH);
    _seeds = [].concat(_seeds).concat(seed);
  } catch (e) { /* ignore */ }

  // collect unique feature from seeds
  _seeds = _.compact(_seeds);
  _seeds = _.uniqWith(_seeds, _.isEqual);

  // upsert features
  features = _.map([].concat(_seeds), function (feature) {
    return function upsertFeatures(next) {
      Feature.upsert(feature, next);
    };
  });

  // seed features
  async.parallel(features, _done);

};


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* use mongoose rest actions*/
FeatureSchema.plugin(actions);


/* export feature model */
module.exports = mongoose.model(FEATURE_MODEL_NAME, FeatureSchema);
