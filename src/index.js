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
  return Object
    .entries(thresholds)
    .every(([ tag, threshold ]) => {
      return (stats[tag].passed / stats[tag].total) * 100 >= threshold;
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

  function reportTagStats([ tag, stats ]) {
    const {passed, total} = stats;
    const percentage = total ? toRoundedPercentage(passed / total) : 0;
    const tagThreshold = thresholds.global[tag];
    const highlight = percentage >= tagThreshold ?
      colors.optimal :
      colors.failed;

    return [
      `${tagLabel[tag]}:`,
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
    Object.entries(stats.global).map(reportTagStats).join('\n'),
    '------------------------------------------------------------'
  );

  return report.join('\n');
}
