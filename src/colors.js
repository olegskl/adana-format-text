/**
 * Color functions for pretty console output.
 * @module colors
 */

import chalk from 'chalk';

/**
 * Color for failure result.
 * @type {Function}
 */
export const failed = chalk.red;

/**
 * Color for optimal result.
 * @type {Function}
 */
export const optimal = chalk.green;
