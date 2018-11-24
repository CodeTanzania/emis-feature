'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Feature } = require(path.join(__dirname, '..', '..'));


describe('Feature Instance', () => {

  it('`preValidate` should be a function', () => {
    const party = Feature.fake();
    expect(party.preValidate).to.exist;
    expect(party.preValidate).to.be.a('function');
    expect(party.preValidate.length).to.be.equal(1);
    expect(party.preValidate.name).to.be.equal('preValidate');
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
