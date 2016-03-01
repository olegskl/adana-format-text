import {optimal, failed} from '../colors';

export default function createReportSummary(isSuccess, environment) {
  const overallResultMessage = isSuccess ? optimal('Passed') : failed('Failed');
  const envName = environment.name || `Node ${process.version}`;
  return `${overallResultMessage} test coverage on ${envName}`;
}
