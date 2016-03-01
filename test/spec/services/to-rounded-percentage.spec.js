import {expect} from 'chai';
import toRoundedPercentage from '../../../src/services/to-rounded-percentage';

describe('toRoundedPercentage', function () {

  it('should round to two decimals', function () {
    expect(toRoundedPercentage(0.2222)).to.equal(22.22);
  });

  it('should round to nearest lower', function () {
    expect(toRoundedPercentage(0.00001)).to.equal(0);
    expect(toRoundedPercentage(0.22221)).to.equal(22.22);
  });

  it('should round to nearest higher', function () {
    expect(toRoundedPercentage(0.99999)).to.equal(100);
    expect(toRoundedPercentage(0.22229)).to.equal(22.23);
  });

  it('should round half up', function () {
    expect(toRoundedPercentage(0.22225)).to.equal(22.23);
  });

  it('should strip trailing zeros', function () {
    expect(toRoundedPercentage(0.2)).to.equal(20);
    expect(toRoundedPercentage(0.2000)).to.equal(20);
    expect(toRoundedPercentage(0.201)).to.equal(20.1);
    expect(toRoundedPercentage(0.2010)).to.equal(20.1);
  });

});
