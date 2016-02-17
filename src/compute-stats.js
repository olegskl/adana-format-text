import {tags, metrics} from 'adana-analyze';

/**
 * Code coverage tags used in the report.
 * @type {Array}
 */
const tagsToSelect = [
  'statement',
  'branch',
  'line',
  'function',
];

/**
 * Generates an empty result.
 * @param   {Array}  tagNameList Tag names.
 * @returns {Object}             Empty result with default values.
 */
function createEmptyResult(tagNameList) {
  return tagNameList.reduce((result, tagName) => {
    result[tagName] = {passed: 0, total: 0};
    return result;
  }, {});
}

export default function computeStats(coverage) {
  function filesReducer(result, fileName) {
    const {locations} = coverage[fileName];
    const tagStats = tags(locations, tagsToSelect);
    result.files[fileName] = {};
    Object.keys(tagStats).forEach(tagName => {
      const tagData = tagStats[tagName];
      const { passed, total } = metrics(tagData);
      result.global[tagName].passed += passed;
      result.global[tagName].total += total;
      result.files[fileName][tagName] = {passed, total};
    });
    return result;
  }

  return Object.keys(coverage).reduce(filesReducer, {
    global: createEmptyResult(tagsToSelect),
    files: {},
  });
}
