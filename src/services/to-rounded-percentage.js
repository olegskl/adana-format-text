/**
 * Ratio to rounded percentage convertor.
 * @module services/to-rounded-percentage
 */

/**
 * Converts a ratio to percentage and rounds to 2 decimals.
 * @param {Number} ratio - Ratio to transform.
 * @return {Number} Rounded percentage value.
 * @example
 *  toRoundedPercentage(0.22225) === 22.23; // true
 */
export default function toRoundedPercentage(ratio) {
  return Math.round(ratio * 1e+4) / 1e+2;
}
