/*
  Copyright 2024 the Catharsis Authors.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

import { execa } from 'execa';
import { task } from 'hereby';
import Jasmine from 'jasmine';
import ConsoleReporter from 'jasmine-console-reporter';
import path from 'path';

const BIN_DIR = 'node_modules/.bin';
const EXECA_OUT = {
  stdout: 'inherit',
  stderr: 'inherit',
};
const sourceGlob = {
  lint: ['*.js', 'lib/**/*.js', 'test/**/*.js'],
  tests: ['test/helpers/add-matchers.js', 'test/*.js'],
};

function bin(name) {
  return path.join(BIN_DIR, name);
}

export const format = task({
  name: 'format',
  run: async () => {
    await execa(bin('prettier'), ['--write', './']);
  },
});

export const licenseHeaders = task({
  name: 'license-headers',
  run: async () => {
    await execa(bin('license-check-and-add'), ['check', '-f', '.license-check.json']);
  },
});

export const lint = task({
  name: 'lint',
  run: async () => {
    await execa(bin('eslint'), [...sourceGlob.lint], EXECA_OUT);
  },
});

export const test = task({
  name: 'test',
  run: async () => {
    const jasmine = new Jasmine();
    const reporter = new ConsoleReporter({
      beep: false,
      verbosity: {
        disabled: false,
        pending: false,
        specs: false,
        summary: true,
      },
    });

    jasmine.clearReporters();
    jasmine.addReporter(reporter);
    jasmine.exitOnCompletion = false;
    jasmine.loadConfig({
      forbidDuplicateNames: true,
      random: true,
      spec_files: sourceGlob.tests, // eslint-disable-line camelcase
      stopSpecOnExpectationFailure: false,
    });

    await jasmine.execute();
  },
});

const lintAndTest = task({
  name: 'lint-and-test',
  dependencies: [lint, test],
});

export default lintAndTest;
