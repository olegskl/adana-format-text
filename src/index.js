import createReportSummary from './reporters/report-summary';
import createGlobalReport from './reporters/report-global';
import createLocalFilesReport from './reporters/report-local-files';
import reportWrap from './reporters/report-wrap';
import computeMetrics from './services/compute-metrics';
import {
  areMetricsAboveThresholds,
  areFilesMetricsAboveThresholds
} from './services/check-against-thresholds';

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
