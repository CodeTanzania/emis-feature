'use strict';


/* dependencies */
const { include } = require('@lykmapipo/include');
const { expect } = require('chai');
const { Feature } = include(__dirname, '..', '..');


describe('Feature Instance', () => {

  it('`preValidate` should be a function', () => {
    const feature = Feature.fake();
    expect(feature.preValidate).to.exist;
    expect(feature.preValidate).to.be.a('function');
    expect(feature.preValidate.length).to.be.equal(1);
    expect(feature.preValidate.name).to.be.equal('preValidate');
  });

  it('should have tag function', () => {
    const feature = Feature.fake();
    expect(feature.tag).to.exist;
    expect(feature.tag).to.be.a('function');

    feature.tag('mountain');
    expect(feature.tags).to.exist;
    expect(feature.tags).to.include('mountain');
  });

});


describe('Feature Statics', () => {

  it('should expose model name', () => {
    expect(Feature.MODEL_NAME).to.exist;
    expect(Feature.MODEL_NAME).to.be.equal('Feature');
  });

  it('should expose collection name', () => {
    expect(Feature.COLLECTION_NAME).to.exist;
    expect(Feature.COLLECTION_NAME).to.be.equal('features');
  });

  it('should expose default category', () => {
    expect(Feature.DEFAULT_CATEGORY).to.exist;
    expect(Feature.DEFAULT_CATEGORY).to.be.a('string');
    expect(Feature.DEFAULT_CATEGORY).to.not.be.empty;
  });

  it('should expose acceptable categories', () => {
    expect(Feature.CATEGORIES).to.exist;
    expect(Feature.CATEGORIES).to.be.an('array');
    expect(Feature.CATEGORIES).to.have.length.at.least(1);
  });

  it('should expose default feature type', () => {
    expect(Feature.DEFAULT_TYPE).to.exist;
    expect(Feature.DEFAULT_TYPE).to.be.a('string');
    expect(Feature.DEFAULT_TYPE).to.not.be.empty;
  });

  it('should expose acceptable feature types', () => {
    expect(Feature.TYPES).to.exist;
    expect(Feature.TYPES).to.be.an('array');
    expect(Feature.TYPES).to.have.length.at.least(1);
  });

});
