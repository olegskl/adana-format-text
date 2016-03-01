/**
 * Metrics calculator and aggregator.
 * @module services/compute-metrics
 */

import {tags, metrics} from 'adana-analyze';

/**
 * Code coverage tags used in the report.
 * @private
 * @type {Array}
 */
const tagsToSelect = [
  'statement',
  'branch',
  'line',
  'function'
];

/**
 * Generates an empty metrics object.
 * @private
 * @param {Array} tagNameList - Tag names.
 * @return {Object} Empty metrics.
 */
function createEmptyMetrics(tagNameList) {
  return tagNameList.reduce((result, tagName) => {
    result[tagName] = {passed: 0, total: 0};
    return result;
  }, {});
}

/**
 * Computes the report metrics (global and per-file).
 * @param {Object} coverage - Adana coverage.
 * @return {Object} Report metrics.
 * @example
 *  computeMetrics({
 *    'foo.js': {hash: ..., path: ..., locations: ...},
 *    'bar.js': {hash: ..., path: ..., locations: ...},
 *  });
 *  // Returns:
 *  // {
 *  //   projectMetrics: {statement: {passed: 0, total: 0}, ...},
 *  //   filesMetrics: {
 *  //     'foo.js': {statement: {passed: 0, total: 0}, ...},
 *  //     'bar.js': {statement: {passed: 0, total: 0}, ...},
 *  //   }
 *  // }
 */
export default function computeMetrics(coverage) {
  const emptyMetrics = createEmptyMetrics(tagsToSelect);
  const result = {projectMetrics: emptyMetrics, filesMetrics: {}};

  Object.keys(coverage).forEach(fileName => {
    const {locations} = coverage[fileName];
    const tagStats = tags(locations, tagsToSelect);
    result.filesMetrics[fileName] = {};
    Object.keys(tagStats).forEach(tagName => {
      const tagData = tagStats[tagName];
      const {passed, total} = metrics(tagData);
      result.projectMetrics[tagName].passed += passed;
      result.projectMetrics[tagName].total += total;
      result.filesMetrics[fileName][tagName] = {passed, total};
    });
  });

  return result;
}
