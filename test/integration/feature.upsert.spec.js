'use strict';


/* dependencies */
const faker = require('@benmaruchu/faker');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { include } = require('@lykmapipo/include');
const { expect } = require('chai');
const { Feature } = include(__dirname, '..', '..');


describe('Feature Upsert', () => {

  before(done => clear('Feature', done));

  let feature;

  beforeEach((done) => {
    feature = Feature.fakeExcept('about');
    feature.post((error, created) => {
      feature = created;
      done(error, created);
    });
  });

  it('should be able upsert non existing', (done) => {
    Feature.upsert(feature, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(feature._id);
      expect(upserted.name).to.be.eql(feature.name);
      done(error, upserted);
    });
  });

  it('should be able upsert existing by _id', (done) => {
    const updates = {
      _id: feature._id,
      about: faker.lorem.sentence()
    };
    Feature.upsert(updates, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(feature._id);
      expect(upserted.name).to.be.eql(feature.name);
      expect(upserted.about).to.not.be.eql(feature.about);
      expect(upserted.about).to.be.eql(updates.about);
      expect(upserted.createdAt).to.be.eql(feature.createdAt);
      done(error, upserted);
    });
  });

  it('should be able upsert existing by fields', (done) => {
    const updates = {
      name: feature.name,
      about: faker.lorem.sentence()
    };
    Feature.upsert(updates, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(feature._id);
      expect(upserted.name).to.be.eql(feature.name);
      expect(upserted.about).to.not.be.eql(feature.about);
      expect(upserted.about).to.be.eql(updates.about);
      expect(upserted.createdAt).to.be.eql(feature.createdAt);
      done(error, upserted);
    });
  });

  after(done => clear('Feature', done));

});
