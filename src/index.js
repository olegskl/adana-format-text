import createReportSummary from './reporters/report-summary';
import createGlobalReport from './reporters/report-global';
import createLocalFilesReport from './reporters/report-local-files';
import reportWrap from './reporters/report-wrap';
import computeMetrics from './services/compute-metrics';
import {
  isAboveThresholds,
  areAboveThresholds,
} from './services/above-thresholds';

export default function textReporter(coverage, {
  environment = {},
  thresholds,
}) {
  const metrics = computeMetrics(coverage);
  const isGlobalSuccess = isAboveThresholds(metrics.global, thresholds.global);
  const isLocalSuccess = areAboveThresholds(metrics.files, thresholds.local);
  const isOverallSuccess = isGlobalSuccess && isLocalSuccess;
  const reportSummary = createReportSummary(isOverallSuccess, environment);

  return reportWrap([
    reportSummary,
    createGlobalReport(metrics.global, thresholds.global),
    createLocalFilesReport(metrics.files, thresholds.local),
    reportSummary,
  ]);
}
