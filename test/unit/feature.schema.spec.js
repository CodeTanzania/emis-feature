'use strict';

/* dependencies */
const { include } = require('@lykmapipo/include');
const { expect } = require('chai');
const { Schema } = require('mongoose');
const { Feature } = include(__dirname, '..', '..');

describe('Feature Schema', () => {
  it('should have nature field', () => {
    const nature = Feature.path('nature');

    expect(nature).to.exist;
    expect(nature).to.be.an.instanceof(Schema.Types.String);
    expect(nature.options).to.exist;
    expect(nature.options).to.be.an('object');
    expect(nature.options.type).to.exist;
    expect(nature.options.trim).to.be.true;
    expect(nature.options.trim).to.be.true;
    expect(nature.options.enum).to.exist;
    expect(nature.options.enum).to.be.eql(Feature.NATURES);
    expect(nature.options.index).to.be.true;
    expect(nature.options.searchable).to.be.true;
    expect(nature.options.default).to.exist;
    expect(nature.options.default).to.be.eql(Feature.DEFAULT_NATURE);
    expect(nature.options.fake).to.be.true;
  });

  it('should have family field', () => {
    const family = Feature.path('family');

    expect(family).to.exist;
    expect(family).to.be.an.instanceof(Schema.Types.String);
    expect(family.options).to.exist;
    expect(family.options).to.be.an('object');
    expect(family.options.type).to.exist;
    expect(family.options.trim).to.be.true;
    expect(family.options.trim).to.be.true;
    expect(family.options.enum).to.exist;
    expect(family.options.enum).to.be.eql(Feature.FAMILIES);
    expect(family.options.index).to.be.true;
    expect(family.options.searchable).to.be.true;
    expect(family.options.default).to.exist;
    expect(family.options.default).to.be.eql(Feature.DEFAULT_FAMILY);
    expect(family.options.fake).to.be.true;
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
    expect(properties.options.of.name).to.be.equal('String');
    expect(properties.options.index).to.be.true;
    expect(properties.options.taggable).to.be.true;
    expect(properties.options.fake).to.exist;
    expect(properties.options.fake).to.be.an('object');
  });

  it('should have place field', () => {
    const place = Feature.path('place');

    expect(place).to.exist;
    expect(place).to.be.an.instanceof(Schema.Types.Map);
    expect(place.options).to.exist;
    expect(place.options).to.be.an('object');
    expect(place.options.type).to.exist;
    expect(place.options.of).to.exist;
    expect(place.options.of.name).to.be.equal('String');
    expect(place.options.index).to.be.true;
    expect(place.options.taggable).to.be.true;
    expect(place.options.default).to.exist;
    expect(place.options.fake).to.be.true;
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
});
