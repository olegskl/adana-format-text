import reportUnit from './report-unit';

export default function createGlobalReport(metrics, thresholds) {
  return reportUnit('Overall project coverage', metrics, thresholds);
}
