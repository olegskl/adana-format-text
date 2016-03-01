/**
 * Text reporter.
 * @module text-reporter
 */

import createReportSummary from './reporters/report-summary';
import createGlobalReport from './reporters/report-global';
import createLocalFilesReport from './reporters/report-local-files';
import reportWrap from './reporters/report-wrap';
import computeMetrics from './services/compute-metrics';
import {
  areMetricsAboveThresholds,
  areFilesMetricsAboveThresholds
} from './services/check-against-thresholds';

/**
 * Text reporter for Adana-compatible results.
 * @param {Object} coverage - Adana-compatible code coverage.
 * @param {Object} options - Options.
 * @param {Object} options.environment - Environment where the tests were run.
 * @param {Object} options.thresholds - Thresholds for comparison with coverage metrics.
 * @return {String} Report ready to be written to stdout.
 */
export default function textReporter(coverage, {
  environment = {},
  thresholds
}) {
  const {projectMetrics, filesMetrics} = computeMetrics(coverage);
  const isGlobalSuccess = areMetricsAboveThresholds(projectMetrics, thresholds.global);
  const isLocalSuccess = areFilesMetricsAboveThresholds(filesMetrics, thresholds.local);
  const isOverallSuccess = isGlobalSuccess && isLocalSuccess;
  const reportSummary = createReportSummary(isOverallSuccess, environment);

  return reportWrap([
    reportSummary,
    createGlobalReport(projectMetrics, thresholds.global),
    createLocalFilesReport(filesMetrics, thresholds.local),
    reportSummary
  ]);
}
