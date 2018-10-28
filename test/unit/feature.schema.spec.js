'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Schema } = require('mongoose');
const Feature = require(path.join(__dirname, '..', '..', 'lib', 'feature.model'));


describe('Feature Schema', () => {

  it('should have category field', () => {
    const category = Feature.path('category');

    expect(category).to.exist;
    expect(category).to.be.an.instanceof(Schema.Types.String);
    expect(category.options).to.exist;
    expect(category.options).to.be.an('object');
    expect(category.options.type).to.exist;
    expect(category.options.trim).to.be.true;
    expect(category.options.enum).to.exist;
    expect(category.options.index).to.be.true;
    expect(category.options.searchable).to.be.true;
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
    expect(type.options.enum).to.exist;
    expect(type.options.index).to.be.true;
    expect(type.options.searchable).to.be.true;
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

});
