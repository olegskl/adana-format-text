/**
 * Report summary.
 * @module reporters/report-summary
 */

import {optimal, failed} from '../colors';

/**
 * Generates the overall report summary.
 * @param  {Boolean} isSuccess   Indicator of coverage matching threshold limits.
 * @param  {Object}  environment The environment where the test was run.
 * @return {String} Report summary.
 * @example
 *  Failed test coverage on Node v5.4.0
 */
export default function createReportSummary(isSuccess, environment) {
  const overallResultMessage = isSuccess ? optimal('Passed') : failed('Failed');
  const envName = environment.name || `Node ${process.version}`;
  return `${overallResultMessage} test coverage on ${envName}`;
}
