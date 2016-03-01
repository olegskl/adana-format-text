/**
 * Common filepath finder.
 * @module services/find-common-path
 */

/**
 * Common path reducer for use in Array.prototype.reduce.
 * @private
 * @param {[String]} a - File path, e.g. `['src', 'foo.js'];`.
 * @param {[String]} b - File path, e.g. `['src', 'bar.js'];`.
 * @return {[String]} Common path, e.g. `['src']`.
 */
function commonPathReducer(a, b) {
  const result = [];
  const minLength = Math.min(a.length, b.length);
  for (let i = 0; i < minLength; i += 1) {
    if (a[i] !== b[i]) { break; }
    result.push(a[i]);
  }
  return result;
}

/**
 * Determines a common root path in the list of file paths.
 * @param {[String]} filePaths - List of paths.
 * @return {String} Common root path.
 * @example
 *  findCommonPath(['src/foo.js', 'src/bar.js']); // 'src'
 */
export default function findCommonPath(filePaths) {
  if (!filePaths.length) { return ''; }
  const splitFullFilePaths = filePaths.map(filePath => filePath.split('/'));
  const commonPath = splitFullFilePaths.length === 1 ?
    splitFullFilePaths[0].slice(0, -1) :
    splitFullFilePaths.reduce(commonPathReducer);
  return commonPath.join('/');
}
