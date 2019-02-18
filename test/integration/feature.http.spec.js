'use strict';


/* dependencies */
const request = require('supertest');
const { include } = require('@lykmapipo/include');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Feature, apiVersion, app } = include(__dirname, '..', '..');

describe('Feature Rest API', () => {

  before(done => clear(done));

  let feature = Feature.fake();

  it('should handle HTTP POST on /features', done => {
    request(app)
      .post(`/${apiVersion}/features`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(feature)
      .expect(201)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const created = new Feature(response.body);

        expect(created._id).to.exist;
        expect(created._id).to.be.eql(feature._id);
        expect(created.name).to.exist;

        //set
        feature = created;

        done(error, response);
      });
  });

  it('should handle HTTP GET on /features', done => {
    request(app)
      .get(`/${apiVersion}/features`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        //assert payload
        const result = response.body;
        expect(result.data).to.exist;
        expect(result.data).to.have.length.at.least(1);
        expect(result.total).to.exist;
        expect(result.limit).to.exist;
        expect(result.skip).to.exist;
        expect(result.page).to.exist;
        expect(result.pages).to.exist;
        expect(result.lastModified).to.exist;
        done(error, response);
      });
  });

  it('should handle HTTP GET on /features/id:', done => {
    request(app)
      .get(`/${apiVersion}/features/${feature._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = new Feature(response.body);

        expect(found._id).to.exist;
        expect(found._id).to.be.eql(feature._id);
        expect(found.name).to.be.equal(feature.name);

        done(error, response);
      });
  });

  it('should handle HTTP PATCH on /features/id:', done => {
    const { name } = feature.fakeOnly('name');
    request(app)
      .patch(`/${apiVersion}/features/${feature._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = new Feature(response.body);

        expect(patched._id).to.exist;
        expect(patched._id).to.be.eql(feature._id);
        expect(patched.name).to.be.equal(feature.name);

        //set
        feature = patched;

        done(error, response);
      });
  });

  it('should handle HTTP PUT on /features/id:', done => {
    const { name } = feature.fakeOnly('name');
    request(app)
      .put(`/${apiVersion}/features/${feature._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = new Feature(response.body);

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(feature._id);
        expect(updated.name).to.be.equal(feature.name);

        //set
        feature = updated;

        done(error, response);
      });
  });

  it('should handle HTTP DELETE on /features/:id', done => {
    request(app)
      .delete(`/${apiVersion}/features/${feature._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const deleted = new Feature(response.body);

        expect(deleted._id).to.exist;
        expect(deleted._id).to.be.eql(feature._id);
        expect(deleted.name).to.be.equal(feature.name);
        done(error, response);
      });
  });

  after(done => clear(done));

});
