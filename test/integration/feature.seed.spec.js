'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { expect } = require('chai');
const { Feature } = include(__dirname, '..', '..');

describe('Feature Seed', () => {
  const SEEDS_PATH = process.env.SEEDS_PATH;

  before(done => clear('Feature', done));

  before(() => {
    process.env.SEEDS_PATH = path.join(__dirname, '..', 'fixtures');
  });

  it('should be able to seed from environment', done => {
    Feature.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { name: 'Boyle Road' })).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if seed from environment exist', done => {
    Feature.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { name: 'Boyle Road' })).to.exist;
      done(error, seeded);
    });
  });

  after(done => clear('Feature', done));

  after(() => {
    process.env.SEEDS_PATH = SEEDS_PATH;
  });
});
