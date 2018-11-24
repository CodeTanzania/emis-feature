'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');
const { Schema } = require('mongoose');
const { Feature } = require(path.join(__dirname, '..', '..'));
const { ADMIN_LEVEL_NAMES } = Feature;


describe('Feature Schema', () => {

  it('should have category field', () => {
    const category = Feature.path('category');

    expect(category).to.exist;
    expect(category).to.be.an.instanceof(Schema.Types.String);
    expect(category.options).to.exist;
    expect(category.options).to.be.an('object');
    expect(category.options.type).to.exist;
    expect(category.options.trim).to.be.true;
    expect(category.options.trim).to.be.true;
    expect(category.options.enum).to.exist;
    expect(category.options.enum).to.be.eql(Feature.CATEGORIES);
    expect(category.options.index).to.be.true;
    expect(category.options.searchable).to.be.true;
    expect(category.options.default).to.exist;
    expect(category.options.default).to.be.eql(Feature.DEFAULT_CATEGORY);
    expect(category.options.fake).to.be.true;
  });

  it('should have type field', () => {
    const type = Feature.path('type');

    expect(type).to.exist;
    expect(type).to.be.an.instanceof(Schema.Types.String);
    expect(type.options).to.exist;
    expect(type.options).to.be.an('object');
    expect(type.options.type).to.exist;
    expect(type.options.trim).to.be.true;
    expect(type.options.trim).to.be.true;
    expect(type.options.enum).to.exist;
    expect(type.options.enum).to.be.eql(Feature.TYPES);
    expect(type.options.index).to.be.true;
    expect(type.options.searchable).to.be.true;
    expect(type.options.default).to.exist;
    expect(type.options.default).to.be.eql(Feature.DEFAULT_TYPE);
    expect(type.options.fake).to.be.true;
  });

  it('should have name field', () => {
    const name = Feature.path('name');

    expect(name).to.exist;
    expect(name).to.be.an.instanceof(Schema.Types.String);
    expect(name.options).to.exist;
    expect(name.options).to.be.an('object');
    expect(name.options.type).to.exist;
    expect(name.options.trim).to.be.true;
    expect(name.options.required).to.be.true;
    expect(name.options.index).to.be.true;
    expect(name.options.searchable).to.be.true;
    expect(name.options.fake).to.exist;
    expect(name.options.fake).to.be.an('object');
  });

  it('should have nickname field', () => {
    const nickname = Feature.path('nickname');

    expect(nickname).to.exist;
    expect(nickname).to.be.an.instanceof(Schema.Types.String);
    expect(nickname.options).to.exist;
    expect(nickname.options).to.be.an('object');
    expect(nickname.options.type).to.exist;
    expect(nickname.options.trim).to.be.true;
    expect(nickname.options.index).to.be.true;
    expect(nickname.options.searchable).to.be.true;
    expect(nickname.options.fake).to.exist;
    expect(nickname.options.fake).to.be.an('object');
  });

  it('should have about field', () => {
    const about = Feature.path('about');

    expect(about).to.exist;
    expect(about).to.be.an.instanceof(Schema.Types.String);
    expect(about.options).to.exist;
    expect(about.options).to.be.an('object');
    expect(about.options.type).to.exist;
    expect(about.options.trim).to.be.true;
    expect(about.options.index).to.be.true;
    expect(about.options.searchable).to.be.true;
    expect(about.options.fake).to.exist;
    expect(about.options.fake).to.be.an('object');
  });

  it('should have centroid field', () => {
    const centroid = Feature.path('centroid');
    const type = Feature.path('centroid.type');
    const coordinates = Feature.path('centroid.coordinates');

    expect(centroid).to.exist;
    expect(type).to.be.instanceof(Schema.Types.String);
    expect(coordinates).to.be.instanceof(Schema.Types.Array);
  });

  it('should have geometry field', () => {
    const geometry = Feature.path('geometry');
    const type = Feature.path('geometry.type');
    const coordinates = Feature.path('geometry.coordinates');

    expect(geometry).to.exist;
    expect(type).to.be.instanceof(Schema.Types.String);
    expect(coordinates).to.be.instanceof(Schema.Types.Array);
  });

  it('should have properties field', () => {
    const properties = Feature.path('properties');

    expect(properties).to.exist;
    expect(properties).to.be.an.instanceof(Schema.Types.Map);
    expect(properties.options).to.exist;
    expect(properties.options).to.be.an('object');
    expect(properties.options.type).to.exist;
    expect(properties.options.of).to.exist;
    expect(properties.options.of.name).to.be.equal(Schema.Types.Mixed.name);
    expect(properties.options.index).to.be.true;
    expect(properties.options.fake).to.exist;
    expect(properties.options.fake).to.be.an('object');
  });

  it('should have tags field', () => {
    const tags = Feature.path('tags');

    expect(tags).to.exist;
    expect(tags).to.be.an.instanceof(Schema.Types.Array);
    expect(tags.options).to.exist;
    expect(tags.options).to.be.an('object');
    expect(tags.options.type).to.exist;
    expect(tags.options.index).to.be.true;
    expect(tags.options.searchable).to.be.true;
  });

  it('should have continent field', () => {
    const continent = Feature.path('continent');

    expect(continent).to.exist;
    expect(continent).to.be.an.instanceof(Schema.Types.String);
    expect(continent.options).to.exist;
    expect(continent.options).to.be.an('object');
    expect(continent.options.type).to.exist;
    expect(continent.options.trim).to.be.true;
    expect(continent.options.required).to.be.true;
    expect(continent.options.enum).to.be.exist;
    expect(continent.options.enum).to.be.eql(Feature.CONTINENTS);
    expect(continent.options.index).to.be.true;
    expect(continent.options.searchable).to.be.true;
    expect(continent.options.default).to.exist;
    expect(continent.options.default).to.be.eql(Feature.DEFAULT_CONTINENT_NAME);
    expect(continent.options.fake).to.exist;
    expect(continent.options.fake).to.be.true;
  });

  it('should have country field', () => {
    const country = Feature.path('country');

    expect(country).to.exist;
    expect(country).to.be.an.instanceof(Schema.Types.String);
    expect(country.options).to.exist;
    expect(country.options).to.be.an('object');
    expect(country.options.type).to.exist;
    expect(country.options.trim).to.be.true;
    expect(country.options.required).to.be.true;
    expect(country.options.enum).to.be.exist;
    expect(country.options.enum).to.be.eql(Feature.COUNTRIES);
    expect(country.options.index).to.be.true;
    expect(country.options.searchable).to.be.true;
    expect(country.options.default).to.exist;
    expect(country.options.default).to.be.eql(Feature.DEFAULT_COUNTRY_NAME);
    expect(country.options.fake).to.exist;
    expect(country.options.fake).to.be.true;
  });

  _.forEach(ADMIN_LEVEL_NAMES, (adminLevel) => {
    it(`should have ${adminLevel} field`, () => {
      const boundary = Feature.path(adminLevel);

      expect(boundary).to.exist;
      expect(boundary).to.be.an.instanceof(Schema.Types.String);
      expect(boundary.options).to.exist;
      expect(boundary.options).to.be.an('object');
      expect(boundary.options.type).to.exist;
      expect(boundary.options.trim).to.be.true;
      expect(boundary.options.index).to.be.true;
      expect(boundary.options.searchable).to.be.true;
      expect(boundary.options.fake).to.exist;
      expect(boundary.options.fake).to.be.an('object');
    });
  });

});
