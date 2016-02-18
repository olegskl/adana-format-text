import {expect} from 'chai';
import findCommonPath from '../../../src/services/find-common-path';

describe('findCommonPath', function() {
  it('should return an empty string if there are no paths', function() {
    expect(findCommonPath([])).to.equal('');
  });
  it('should return an empty string for different paths', function() {
    expect(findCommonPath([
      'src/foo.js',
      'lib/bar.js',
    ])).to.equal('');
  });
  it('should return a common path for path sharing same root', function() {
    expect(findCommonPath([
      'src/foo.js',
      'src/bar.js',
    ])).to.equal('src');
  });
});
