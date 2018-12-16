'use strict';


/* dependencies */
const { include } = require('@lykmapipo/include');
const { expect } = require('chai');
const { Feature } = include(__dirname, '..', '..');


describe('Feature Static Patch', () => {

  before((done) => {
    Feature.deleteMany(done);
  });

  let feature = Feature.fake();

  before((done) => {
    feature.post((error, created) => {
      feature = created;
      done(error, created);
    });
  });

  it('should be able to patch', (done) => {
    feature = feature.fakeOnly('name');
    Feature.patch(feature._id, feature, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(feature._id);
      expect(updated.name).to.eql(feature.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    const fake = Feature.fake();
    Feature.patch(fake._id, fake, (error, updated) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(updated).to.not.exist;
      done();
    });
  });

  after((done) => {
    Feature.deleteMany(done);
  });

});


describe('Feature Instance Patch', () => {

  before((done) => {
    Feature.deleteMany(done);
  });

  let feature = Feature.fake();

  before((done) => {
    feature.post((error, created) => {
      feature = created;
      done(error, created);
    });
  });

  it('should be able to patch', (done) => {
    feature = feature.fakeOnly('name');
    feature.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(feature._id);
      expect(updated.name).to.eql(feature.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    feature.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(feature._id);
      done();
    });
  });

  after((done) => {
    Feature.deleteMany(done);
  });

});
