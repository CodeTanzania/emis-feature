'use strict';


/* dependencies */
const { include } = require('@lykmapipo/include');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Feature } = include(__dirname, '..', '..');


describe('Feature Static Post', () => {

  before((done) => clear(done));

  let feature = Feature.fake();

  it('should be able to post', (done) => {
    Feature.post(feature, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(feature._id);
      expect(created.name).to.eql(feature.name);
      done(error, created);
    });
  });

  after((done) => clear(done));

});


describe('Feature Instance Post', () => {

  before((done) => clear(done));

  let feature = Feature.fake();

  it('should be able to post', (done) => {
    feature.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(feature._id);
      expect(created.name).to.eql(feature.name);
      done(error, created);
    });
  });

  after((done) => clear(done));

});
