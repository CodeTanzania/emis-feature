'use strict';

/* dependencies */
const _ = require('lodash');
const { include } = require('@lykmapipo/include');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Feature } = include(__dirname, '..', '..');

describe('Feature Static Patch', () => {
  before(done => clear(done));

  let feature = Feature.fake();

  before(done => {
    feature.post((error, created) => {
      feature = created;
      done(error, created);
    });
  });

  it('should be able to patch', done => {
    feature = feature.fakeOnly('name');
    Feature.patch(feature._id, feature, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(feature._id);
      expect(updated.name).to.eql(feature.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    const fake = Feature.fake().toObject();
    Feature.patch(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => clear(done));
});

describe('Feature Instance Patch', () => {
  before(done => clear(done));

  let feature = Feature.fake();

  before(done => {
    feature.post((error, created) => {
      feature = created;
      done(error, created);
    });
  });

  it('should be able to patch', done => {
    feature = feature.fakeOnly('name');
    feature.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(feature._id);
      expect(updated.name).to.eql(feature.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    feature.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(feature._id);
      done();
    });
  });

  after(done => clear(done));
});
