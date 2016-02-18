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
  const { projectMetrics, filesMetrics } = computeMetrics(coverage);
  const isGlobalSuccess = isAboveThresholds(projectMetrics, thresholds.global);
  const isLocalSuccess = areAboveThresholds(filesMetrics, thresholds.local);
  const isOverallSuccess = isGlobalSuccess && isLocalSuccess;
  const reportSummary = createReportSummary(isOverallSuccess, environment);

  return reportWrap([
    reportSummary,
    createGlobalReport(projectMetrics, thresholds.global),
    createLocalFilesReport(filesMetrics, thresholds.local),
    reportSummary,
  ]);
}
