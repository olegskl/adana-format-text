import fs from 'fs';
import path from 'path';
import {expect} from 'chai';
import computeMetrics from '../../../src/services/compute-metrics';

describe('computeMetrics', function () {
  const fixturePath = path.resolve(
    __dirname,
    '../../fixtures/babel-plugin-transform-adana.json'
  );
  const fixtureJSON = fs.readFileSync(fixturePath, 'utf8'); // eslint-disable-line no-sync
  const fixtureProjectMetrics = {
    statement: {passed: 109, total: 109},
    branch: {passed: 85, total: 98},
    line: {passed: 109, total: 109},
    function: {passed: 43, total: 43}
  };
  const fixtureFileMetrics = {
    statement: {passed: 2, total: 2},
    branch: {passed: 2, total: 2},
    line: {passed: 2, total: 2},
    function: {passed: 1, total: 1}
  };

  beforeEach(function () {
    this.fixture = JSON.parse(fixtureJSON);
  });

  it('should return an object with `projectMetrics` property', function () {
    const metrics = computeMetrics(this.fixture);
    expect(metrics).to.haveOwnProperty('projectMetrics');
  });

  it('should return an object with `filesMetrics` property', function () {
    const metrics = computeMetrics(this.fixture);
    expect(metrics).to.haveOwnProperty('filesMetrics');
  });

  it('should compute project metrics', function () {
    const {projectMetrics} = computeMetrics(this.fixture);
    expect(projectMetrics).to.deep.equal(fixtureProjectMetrics);
  });

  it('should compute project file metrics', function () {
    const {filesMetrics} = computeMetrics(this.fixture);
    const fileMetrics = filesMetrics['src/meta.js'];
    expect(fileMetrics).to.deep.equal(fixtureFileMetrics);
  });

});
