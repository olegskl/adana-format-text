# adana-format-text

[![Build Status](https://travis-ci.org/olegskl/adana-format-text.svg?branch=master)](https://travis-ci.org/olegskl/adana-format-text)

Unit test coverage reporter for [Adana](https://github.com/adana-coverage/babel-plugin-transform-adana).

## Installation

```bash
npm install adana-format-text --save-dev
```

## Usage

Similar to other adana coverage formatters, adana-format-text accepts an adana-compatible coverage results object and produces a report as utf8-encoded string.

### Usage with [adana-cli](https://github.com/adana-coverage/adana-cli)

```bash
cat coverage.json | adana --format text > report.txt
```

### Usage with [karma-adana-reporter](https://github.com/olegskl/karma-adana-reporter)

Add adana-format-text to the list of formatters in [adana configuration object](https://github.com/olegskl/karma-adana-reporter#usage) of the [karma configuration file](https://karma-runner.github.io/0.13/config/configuration-file.html).

```js
formatters: [
  {
    type: 'text', // indicates usage of the "text" formatter
    save: 'reports/text-report.txt', // will write output to file
    show: true // will dump the same output to console
  }
]
```

### Usage in Node

```js
import fs from 'fs';
import adanaFormatText from 'adana-format-text';

fs.readFile('coverage.json', 'utf8', (err, data) => {
  const coverage = JSON.parse(data);
  const report = adanaFormatText(coverage);
  fs.writeFile('text-report.txt', report);
});
```

Note that if you're using ES5, you will have to access the library via the `default` property due to [the way exports are handled in Babel 6](https://phabricator.babeljs.io/T2212):

```js
var adanaFormatText = require('adana-format-text').default;
```

## License

[MIT License](http://opensource.org/licenses/MIT)
