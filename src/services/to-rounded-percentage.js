/**
 * Transforms a ratio to percentage and rounds to 2 decimals.
 * @param   {Number} ratio Ratio to transform.
 * @returns {Number}       Rounded percentage value.
 * @example toRoundedPercentage(0.22225) === 22.23;
 */
export default function toRoundedPercentage(ratio) {
  return Math.round(ratio * 1e+4) / 1e+2;
}
