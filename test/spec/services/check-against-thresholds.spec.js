import {expect} from 'chai';
import {
  areMetricsAboveThresholds,
  areFilesMetricsAboveThresholds,
} from '../../../src/services/check-against-thresholds';

describe('areMetricsAboveThresholds', function() {
  it('should return true if metrics match thresholds', function() {
    const metrics = {
      statement: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      branch: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      line: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      function: { passed: 1, total: 1 }, // 1/1 = 100% coverage
    };
    const thresholds = {
      statement: 100,
      branch: 100,
      line: 100,
      function: 100,
    };
    expect(areMetricsAboveThresholds(metrics, thresholds)).to.equal(true);
  });
  it('should return true if all metrics exceed thresholds', function() {
    const metrics = {
      statement: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      branch: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      line: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      function: { passed: 1, total: 1 }, // 1/1 = 100% coverage
    };
    const thresholds = {
      statement: 99,
      branch: 99,
      line: 99,
      function: 99,
    };
    expect(areMetricsAboveThresholds(metrics, thresholds)).to.equal(true);
  });
  it('should return false if all metrics are below thresholds', function() {
    const metrics = {
      statement: { passed: 1, total: 2 }, // 1/2 = 50% coverage
      branch: { passed: 1, total: 2 }, // 1/2 = 50% coverage
      line: { passed: 1, total: 2 }, // 1/2 = 50% coverage
      function: { passed: 1, total: 2 }, // 1/2 = 50% coverage
    };
    const thresholds = {
      statement: 51,
      branch: 51,
      line: 51,
      function: 51,
    };
    expect(areMetricsAboveThresholds(metrics, thresholds)).to.equal(false);
  });
  it('should return false if any metric is below thresholds', function() {
    const metrics = {
      statement: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      branch: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      line: { passed: 1, total: 2 }, // 1/2 = 50% coverage!
      function: { passed: 1, total: 1 }, // 1/1 = 100% coverage
    };
    const thresholds = {
      statement: 100,
      branch: 100,
      line: 100,
      function: 100,
    };
    expect(areMetricsAboveThresholds(metrics, thresholds)).to.equal(false);
  });
});

describe('areFilesMetricsAboveThresholds', function() {
  it('should return true if all file metrics match thresholds', function() {
    const files = {
      'a.js': {
        statement: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        branch: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        line: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        function: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      },
      'b.js': {
        statement: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        branch: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        line: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        function: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      },
    };
    const thresholds = {
      statement: 100,
      branch: 100,
      line: 100,
      function: 100,
    };
    expect(areFilesMetricsAboveThresholds(files, thresholds)).to.equal(true);
  });
  it('should return true if all file metrics exceed thresholds', function() {
    const files = {
      'a.js': {
        statement: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        branch: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        line: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        function: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      },
      'b.js': {
        statement: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        branch: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        line: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        function: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      },
    };
    const thresholds = {
      statement: 99,
      branch: 99,
      line: 99,
      function: 99,
    };
    expect(areFilesMetricsAboveThresholds(files, thresholds)).to.equal(true);
  });
  it('should return false if all file metrics below thresholds', function() {
    const files = {
      'a.js': {
        statement: { passed: 1, total: 2 }, // 1/2 = 50% coverage
        branch: { passed: 1, total: 2 }, // 1/2 = 50% coverage
        line: { passed: 1, total: 2 }, // 1/2 = 50% coverage
        function: { passed: 1, total: 2 }, // 1/2 = 50% coverage
      },
      'b.js': {
        statement: { passed: 1, total: 2 }, // 1/2 = 50% coverage
        branch: { passed: 1, total: 2 }, // 1/2 = 50% coverage
        line: { passed: 1, total: 2 }, // 1/2 = 50% coverage
        function: { passed: 1, total: 2 }, // 1/2 = 50% coverage
      },
    };
    const thresholds = {
      statement: 51,
      branch: 51,
      line: 51,
      function: 51,
    };
    expect(areFilesMetricsAboveThresholds(files, thresholds)).to.equal(false);
  });
  it('should return false if any file metric is below thresholds', function() {
    const files = {
      'a.js': {
        statement: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        branch: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        line: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        function: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      },
      'b.js': {
        statement: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        branch: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        line: { passed: 1, total: 2 }, // 1/2 = 50% coverage here!
        function: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      },
      'c.js': {
        statement: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        branch: { passed: 1, total: 1 }, // 1/1 = 50% coverage
        line: { passed: 1, total: 1 }, // 1/1 = 100% coverage
        function: { passed: 1, total: 1 }, // 1/1 = 100% coverage
      },
    };
    const thresholds = {
      statement: 100,
      branch: 100,
      line: 100,
      function: 100,
    };
    expect(areFilesMetricsAboveThresholds(files, thresholds)).to.equal(false);
  });
});
