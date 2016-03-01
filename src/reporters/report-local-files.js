/**
 * Local files reporter.
 * @module reporters/report-local-files
 */

import reportUnit from './report-unit';
import findCommonPath from '../services/find-common-path';
import {areMetricsAboveThresholds} from '../services/check-against-thresholds';

/**
 * File path separator (may differ depending on OS).
 * @private
 * @type {RegExp}
 */
const separator = /\\|\//;

/**
 * Normalizes file path separators.
 * @private
 * @param {String} path - File path.
 * @return {String} Normalized file path.
 * @example
 *  normalizePath('a\b\c'); // 'a/b/c'
 */
function normalizePath(path) {
  return path.replace(separator, '/');
}

/**
 * Creates a failed file reporter function.
 * @private
 * @param {Object} localThresholds - Thresholds to be used in the reporter.
 * @return {Function} Failed file reporter.
 */
function failedFileReporterFactory(localThresholds) {

  /**
   * Failed file reporter.
   * @private
   * @param {Object} localReport - Report for a given file.
   * @param {String} localReport.name - File name.
   * @param {Object} localReport.metrics - File coverage metrics.
   * @return {String} Unit report.
   */
  return function reportFailedFile({name, metrics}) {
    return reportUnit(name, metrics, localThresholds);
  };
}

/**
 * Finds and removes the common path from a list of files.
 * @private
 * @param {[Object]} failedFiles - List of files.
 * @return {[Object]} List of files with common path removed.
 */
function removeCommonPath(failedFiles) {
  const filePathList = failedFiles.map(file => file.name);
  const commonPath = findCommonPath(filePathList);
  if (!commonPath) { return failedFiles; }
  return failedFiles.map(file => {
    file.name = file.name.slice(commonPath.length + 1);
    return file;
  });
}

/**
 * Finds files that have failed local thresholds.
 * @private
 * @param {Object} fileMetricsIndex - Index of file metrics.
 * @param {Object} thresholds - Local thresholds.
 * @return {Array} List of files that have failed local thresholds.
 */
function findFilesFailingThresholds(fileMetricsIndex, thresholds) {
  return Object.keys(fileMetricsIndex)
    .filter(fileName => {
      const fileMetrics = fileMetricsIndex[fileName];
      return !areMetricsAboveThresholds(fileMetrics, thresholds);
    })
    .map(fileName => {
      return {
        name: normalizePath(fileName),
        metrics: fileMetricsIndex[fileName]
      };
    });
}

/**
 * Generates a report displaying files that have failed local thresholds.
 * @param {Object} fileIndex - Index of file metrics.
 * @param {Object} thresholds - Local thresholds.
 * @return {String} Failed files report.
 * @example
 *  Failed report A
 *
 *  Failed report B
 *
 *  Failed report C
 */
export default function createLocalFilesReport(fileIndex, thresholds) {
  const failedFiles = findFilesFailingThresholds(fileIndex, thresholds);
  const failedFileReporter = failedFileReporterFactory(thresholds);
  return removeCommonPath(failedFiles)
    .map(failedFileReporter)
    .join('\n\n');
}
