const doubleLineBreak = '='.repeat(60);

function nonEmpty(value) {
  return !!value;
}

export default function reportWrap(report) {
  return [
    doubleLineBreak,
    report.filter(nonEmpty).join('\n\n'),
    doubleLineBreak
  ].join('\n');
}
