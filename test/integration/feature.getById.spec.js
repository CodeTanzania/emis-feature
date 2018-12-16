'use strict';


/* dependencies */
const _ = require('lodash');
const { include } = require('@lykmapipo/include');
const { expect } = require('chai');
const { Feature } = include(__dirname, '..', '..');


describe('Feature getById', () => {

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

  it('should be able to get an instance', (done) => {
    Feature.getById(feature._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(feature._id);
      done(error, found);
    });
  });

  it('should be able to get with options', (done) => {
    const options = {
      _id: feature._id,
      select: 'name'
    };

    Feature.getById(options, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(feature._id);
      expect(found.name).to.exist;

      //...assert selection
      const fields = _.keys(found.toObject());
      expect(fields).to.have.length(2);
      _.map([
        'centroid',
        'geometry',
        'createdAt',
        'updatedAt'
      ], function (field) {
        expect(fields).to.not.include(field);
      });
      done(error, found);
    });

  });

  it('should throw if not exists', (done) => {
    const feature = Feature.fake();
    Feature.getById(feature._id, (error, found) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(found).to.not.exist;
      done();
    });
  });

  after((done) => {
    Feature.deleteMany(done);
  });

});
