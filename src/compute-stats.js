import {tags, metrics} from 'adana-analyze';

const emptyResult = {
  statement: {passed: 0, total: 0},
  branch: {passed: 0, total: 0},
  line: {passed: 0, total: 0},
  function: {passed: 0, total: 0},
};

const usedTags = Object.keys(emptyResult);

function filesReducer(result, [ file, coverage ]) {
  const tagStats = tags(coverage.locations, usedTags);
  result.files[file] = {};
  Object.entries(tagStats).forEach(([ tagName, tagData ]) => {
    const { passed, total } = metrics(tagData);
    result.global[tagName].passed += passed;
    result.global[tagName].total += total;
    result.files[file][tagName] = {passed, total};
  });
  return result;
}

export default function computeStats(coverage) {
  return Object
    .entries(coverage)
    .reduce(filesReducer, {
      global: emptyResult,
      files: {},
    });
}
