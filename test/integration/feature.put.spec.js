'use strict';

/* dependencies */
const _ = require('lodash');
const path = require('path');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Feature } = require(path.join(__dirname, '..', '..'));

describe('Feature Static Put', () => {
  before(done => clear(done));

  let feature = Feature.fake();

  before(done => {
    feature.post((error, created) => {
      feature = created;
      done(error, created);
    });
  });

  it('should be able to put', done => {
    feature = feature.fakeOnly('name');
    Feature.put(feature._id, feature, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(feature._id);
      expect(updated.name).to.eql(feature.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    const fake = Feature.fake().toObject();
    Feature.put(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => clear(done));
});

describe('Feature Instance Put', () => {
  before(done => clear(done));

  let feature = Feature.fake();

  before(done => {
    feature.post((error, created) => {
      feature = created;
      done(error, created);
    });
  });

  it('should be able to put', done => {
    feature = feature.fakeOnly('name');
    feature.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(feature._id);
      expect(updated.name).to.eql(feature.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    feature.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(feature._id);
      done();
    });
  });

  after(done => clear(done));
});
