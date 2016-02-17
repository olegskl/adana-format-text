import chalk from 'chalk';
import computeStats from './compute-stats';
import toRoundedPercentage from './to-rounded-percentage';

const colors = {
  failed: chalk.red,
  optimal: chalk.green,
};

const tagLabel = {
  statement: 'Statements',
  branch: 'Branches',
  line: 'Lines',
  function: 'Functions',
};

function isGlobalSuccess(stats, thresholds) {
  return Object.keys(thresholds).every(tagName => {
    const {passed, total} = stats[tagName];
    const ratio = total ? passed / total : 0;
    return ratio * 100 >= thresholds[tagName];
  });
}

export default function textReporter(coverage, {
  environment = {},
  thresholds,
}) {
  const report = [];
  const stats = computeStats(coverage);
  const globalSuccess = isGlobalSuccess(stats.global, thresholds.global);
  const overallResult = globalSuccess ?
    colors.optimal('Passed') :
    colors.failed('Failed');

  function reportTagStats(tagName) {
    const tagStats = stats.global[tagName];
    const {passed, total} = tagStats;
    const percentage = total ? toRoundedPercentage(passed / total) : 0;
    const tagThreshold = thresholds.global[tagName];
    const highlight = percentage >= tagThreshold ?
      colors.optimal :
      colors.failed;

    return [
      `${tagLabel[tagName]}:`,
      `${highlight(percentage)}%`,
      `(covered ${passed}/${total}, threshold ${tagThreshold})`,
    ].join(' ');
  }

  if (environment.name) {
    report.push(
      `${overallResult} overall test coverage on ${environment.name}`
    );
  }

  report.push(
    '------------------------------------------------------------',
    Object.keys(stats.global).map(reportTagStats).join('\n'),
    '------------------------------------------------------------'
  );

  return report.join('\n');
}
