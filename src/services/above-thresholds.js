export function isAboveThresholds(metrics, thresholds) {
  return Object.keys(thresholds).every(tagName => {
    const {passed, total} = metrics[tagName];
    const ratio = total ? passed / total : 1;
    return ratio * 100 >= thresholds[tagName];
  });
}

export function areAboveThresholds(filesIndex, thresholds) {
  return Object.keys(filesIndex).every(fileName => {
    const fileMetrics = filesIndex[fileName];
    return isAboveThresholds(fileMetrics, thresholds);
  });
}
