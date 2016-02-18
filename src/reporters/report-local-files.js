import reportUnit from './report-unit';
import findCommonPath from '../services/find-common-path';
import {areMetricsAboveThresholds} from '../services/check-against-thresholds';

const separator = /\\|\//;
function normalizePath(path) {
  return path.replace(separator, '/');
}

function reportFailedLocalFile(localThresholds) {
  return function({ name, metrics }) {
    return reportUnit(name, metrics, localThresholds);
  };
}

function removeCommonPath(failedFiles) {
  const filePathList = failedFiles.map(file => file.name);
  const commonPath = findCommonPath(filePathList);
  if (!commonPath) { return failedFiles; }
  return failedFiles.map(file => {
    file.name = file.name.slice(commonPath.length + 1);
    return file;
  });
}

function findFilesFailingThresholds(fileMetricsIndex, thresholds) {
  return Object.keys(fileMetricsIndex)
    .filter(fileName => {
      const fileMetrics = fileMetricsIndex[fileName];
      return !areMetricsAboveThresholds(fileMetrics, thresholds);
    })
    .map(fileName => {
      return {
        name: normalizePath(fileName),
        metrics: fileMetricsIndex[fileName],
      };
    });
}

export default function createLocalFilesReport(fileIndex, thresholds) {
  const failingFiles = findFilesFailingThresholds(fileIndex, thresholds);
  return removeCommonPath(failingFiles)
    .map(reportFailedLocalFile(thresholds))
    .join('\n\n');
}
