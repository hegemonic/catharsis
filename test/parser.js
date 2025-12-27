/*
  Copyright 2012 the Catharsis Authors.

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

const _ = require('lodash');
const Ajv = require('ajv');
const runTestSpecs = require('./helpers/run-test-specs');
const parse = require('../lib/parser').parse;
const path = require('path');
const schema = require('../lib/schema');
const util = require('util');

const ajv = new Ajv({
  allErrors: true,
  ownProperties: true,
});
const validate = ajv.compile(schema);

function parseIt(item, options) {
  let parsed;

  try {
    parsed = parse(item.expression, options);
  } catch (e) {
    throw new Error(
      util.format('unable to parse type expression "%s": %s', item.expression, e.message)
    );
  }

  if (!_.isEqual(parsed, item.parsed)) {
    throw new Error(util.format('parse tree should be "%j", NOT "%j"', item.parsed, parsed));
  }

  return parsed;
}

function checkTypes(filepath, options) {
  const types = require(filepath);

  const errors = [];
  let parsedType;
  const validationErrors = [];
  let validationResult;

  types.forEach((type) => {
    try {
      parsedType = parseIt(type, options);
      validationResult = validate(parsedType);
      if (validationResult === false) {
        validationErrors.push({
          expression: type.expression,
          errors: validate.errors.slice(0),
        });
      }
    } catch (e) {
      errors.push(e.message);
    }
  });

  expect(errors).toBeEmptyArray();
  expect(validationErrors).toBeEmptyArray();
}

function checkBadTypes(filepath, options) {
  const errors = [];
  const types = require(filepath);

  types.forEach((type) => {
    try {
      parseIt(type, options);
      errors.push(`\`${type.expression}\` was parsed successfully but should have failed`);
    } catch (e) {
      // This is supposed to throw, so do nothing.
    }
  });

  errors.forEach((e) => {
    expect(e).toBeNull();
  });
}

describe('parser', () => {
  describe('parse()', () => {
    const specs = './test/specs';
    const jsdocSpecs = path.join(specs, 'jsdoc');

    function tester(specPath, basename) {
      it(`can parse types in the "${basename}" spec`, () => {
        checkTypes(path.join(specPath, basename), {});
      });
    }

    function jsdocTester(specPath, basename) {
      it(`can parse types in the "${basename}" spec when JSDoc type parsing is enabled`, () => {
        checkTypes(path.join(specPath, basename), { jsdoc: true });
      });
    }

    function nonJsdocTester(specPath, basename) {
      it(`can't parse types in the "${basename}" spec when JSDoc type parsing is not enabled`, () => {
        checkBadTypes(path.join(specPath, basename), {});
      });
    }

    runTestSpecs(specs, tester);
    runTestSpecs(jsdocSpecs, jsdocTester);
    runTestSpecs(jsdocSpecs, nonJsdocTester);
  });
});
