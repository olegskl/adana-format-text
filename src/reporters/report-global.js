/**
 * Global reporter.
 * @module reporters/report-global
 */

import reportUnit from './report-unit';

/**
 * Creates a global coverage report.
 * @param {Object} metrics - Global metrics.
 * @param {Object} thresholds - Global thresholds.
 * @return {String} Global coverage report as report unit.
 */
export default function createGlobalReport(metrics, thresholds) {
  return reportUnit('Overall project coverage', metrics, thresholds);
}
