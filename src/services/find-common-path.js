function commonPathReducer(a, b) {
  const result = [];
  const minLength = Math.min(a.length, b.length);
  for (let i = 0; i < minLength; i += 1) {
    if (a[i] !== b[i]) { break; }
    result.push(a[i]);
  }
  return result;
}

export default function findCommonPath(filePaths = []) {
  if (!filePaths.length) { return ''; }
  const splitFullFilePaths = filePaths
    .map(filePath => filePath.split('/'));
  const commonPath = splitFullFilePaths.length === 1 ?
    splitFullFilePaths[0].slice(0, -1) :
    splitFullFilePaths.reduce(commonPathReducer);
  return commonPath.join('/');
}
