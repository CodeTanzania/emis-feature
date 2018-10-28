'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Feature } = require(path.join(__dirname, '..', '..'));

describe('Feature Static Delete', () => {

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

  it('should be able to delete', (done) => {
    Feature.del(feature._id, (error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(feature._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', (done) => {
    Feature.del(feature._id, (error, deleted) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(deleted).to.not.exist;
      done();
    });
  });

  after((done) => {
    Feature.deleteMany(done);
  });

});

describe('Feature Instance Delete', () => {

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

  it('should be able to delete', (done) => {
    feature.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(feature._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', (done) => {
    feature.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(feature._id);
      done();
    });
  });

  after((done) => {
    Feature.deleteMany(done);
  });

});
