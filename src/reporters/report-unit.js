/**
 * Report unit.
 * @module src/reporters/report-unit
 */

import toRoundedPercentage from '../services/to-rounded-percentage';
import {optimal, failed} from '../colors';

/**
 * Report unit separator.
 * @private
 * @type String
 */
const singleLineBreak = '-'.repeat(60);

/**
 * Tag label dictionary - maps tag names to their labels.
 * @private
 * @type Object
 */
const tagLabel = {
  statement: 'Statements',
  branch: 'Branches',
  line: 'Lines',
  function: 'Functions'
};

/**
 * Tag metrics reporter factory.
 * @private
 * @param {Object} metrics - Metrics.
 * @param {Object} thresholds - Thresholds.
 * @return {Function} Tag metrics reporter.
 */
function tagMetricsReporterFactory(metrics, thresholds) {

  /**
   * Individual tag metrics reporter.
   * @private
   * @param {String} tagName Name of tag to report.
   * @return {String} Stringified metrics for a given tag.
   * @example
   *  Statement: 50% (covered 5/10, threshold 100%)
   */
  return function reportTagMetrics(tagName) {
    const tagStats = metrics[tagName];
    const {passed, total} = tagStats;
    const percentage = total ? toRoundedPercentage(passed / total) : 100;
    const tagThreshold = thresholds[tagName];
    const highlight = percentage >= tagThreshold ? optimal : failed;

    return [
      `${tagLabel[tagName]}:`,
      `${highlight(percentage)}%`,
      `(covered ${passed}/${total}, threshold ${tagThreshold}%)`
    ].join(' ');
  };
}

/**
 * Generates a report unit.
 * @param {String} title - Report unit title.
 * @param {Object} metrics - Metrics.
 * @param {Object} thresholds - Thresholds.
 * @return {String} Stringified report unit.
 * @example
 *  My report unit title (usually a file path)
 *  ------------------------------------------------------------
 *  Statements: 50% (covered 5/10, threshold 100%)
 *  Branches: 50% (covered 5/10, threshold 100%)
 *  Lines: 50% (covered 5/10, threshold 100%)
 *  Functions: 50% (covered 5/10, threshold 100%)
 */
export default function reportUnit(title, metrics, thresholds) {
  const tagMetricsReporter = tagMetricsReporterFactory(metrics, thresholds);
  const report = Object.keys(metrics).map(tagMetricsReporter);
  return [title, singleLineBreak, ...report].join('\n');
}
