/**
 * Report wrapper.
 * @module reporters/report-wrap
 */

/**
 * Report separator.
 * @private
 * @type String
 */
const doubleLineBreak = '='.repeat(60);

/**
 * Determines if a given value is not empty.
 * @private
 * @param {String} value - Value to check.
 * @return {Boolean} True if not empty, false otherwise.
 */
function isNotEmpty(value) {
  return !!value;
}

/**
 * Wraps the entire report with separator lines and joins report units.
 * @param {Array} reportUnits - Report units.
 * @return {String} Wrapped and joined report.
 * @example
 *  ============================================================
 *  Report unit A
 *
 *  Report unit B
 *
 *  Report unit C
 *  ============================================================
 */
export default function reportWrap(reportUnits) {
  return [
    doubleLineBreak,
    reportUnits.filter(isNotEmpty).join('\n\n'),
    doubleLineBreak
  ].join('\n');
}
