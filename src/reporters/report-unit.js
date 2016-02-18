import toRoundedPercentage from '../services/to-rounded-percentage';
import { optimal, failed } from '../colors';

const singleLineBreak = '-'.repeat(60);
const tagLabel = {
  statement: 'Statements',
  branch: 'Branches',
  line: 'Lines',
  function: 'Functions',
};

function tagMetricsReporterFactory(metrics, thresholds) {
  return function reportTagMetrics(tagName) {
    const tagStats = metrics[tagName];
    const {passed, total} = tagStats;
    const percentage = total ? toRoundedPercentage(passed / total) : 100;
    const tagThreshold = thresholds[tagName];
    const highlight = percentage >= tagThreshold ? optimal : failed;

    return [
      `${tagLabel[tagName]}:`,
      `${highlight(percentage)}%`,
      `(covered ${passed}/${total}, threshold ${tagThreshold}%)`,
    ].join(' ');
  };
}

export default function reportUnit(title, metrics, thresholds) {
  const tagMetricsReporter = tagMetricsReporterFactory(metrics, thresholds);
  const report = Object.keys(metrics).map(tagMetricsReporter);
  return [ title, singleLineBreak, ...report ].join('\n');
}
