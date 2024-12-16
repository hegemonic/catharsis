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
