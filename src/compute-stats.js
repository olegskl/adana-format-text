import {tags, metrics} from 'adana-analyze';

const emptyResult = {
  statement: {passed: 0, total: 0},
  branch: {passed: 0, total: 0},
  line: {passed: 0, total: 0},
  function: {passed: 0, total: 0},
};

const usedTags = Object.keys(emptyResult);

export default function computeStats(coverage) {
  function filesReducer(result, fileName) {
    const {locations} = coverage[fileName];
    const tagStats = tags(locations, usedTags);
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
    global: emptyResult,
    files: {},
  });
}
