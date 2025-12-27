/*
  Copyright 2014 the Catharsis Authors.

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
const describer = require('../lib/describe');
const runTestSpecs = require('./helpers/run-test-specs');
const parse = require('../lib/parser').parse;
const path = require('path');
const util = require('util');

const defaultModifierText = {
  functionNew: '',
  functionThis: '',
  optional: '',
  nullable: '',
  repeatable: '',
};

function describeIt(expression, parsedType, expected, options) {
  let actual;

  expected.extended.modifiers = _.defaults({}, expected.extended.modifiers, defaultModifierText);
  actual = describer(parsedType, options);

  try {
    expect(JSON.parse(JSON.stringify(actual))).toEqual(JSON.parse(JSON.stringify(expected)));
  } catch (e) {
    throw new Error(
      util.format(
        'type expression %j was described as %j; expected %j',
        expression,
        actual,
        expected
      )
    );
  }
}

function checkDescribedTypes(filepath, options) {
  let parsedType;
  const types = require(filepath);

  const errors = [];

  types.forEach(({ expression, described }) => {
    try {
      parsedType = parse(expression, options);
      describeIt(expression, parsedType, described.en, options);
    } catch (e) {
      errors.push(e.message);
    }
  });

  expect(errors).toBeEmptyArray();
}

describe('describe', () => {
  const specs = './test/specs';
  const codetagSpecs = path.join(specs, 'codetag');
  const htmlSpecs = path.join(specs, 'html');
  const jsdocSpecs = path.join(specs, 'jsdoc');
  const linkSpecs = path.join(specs, 'link');
  const linkCssSpecs = path.join(specs, 'linkcss');

  const links = {
    Foo: 'Foo.html',
    'module:foo/bar/baz~Qux': 'foobarbazqux.html',
  };

  function tester(specPath, basename, options) {
    it(`can describe types in the "${basename}" spec`, () => {
      checkDescribedTypes(path.join(specPath, basename), options);
    });
  }

  runTestSpecs(specs, tester, {});
  runTestSpecs(codetagSpecs, tester, {
    codeClass: 'code-class',
    codeTag: 'foo',
  });
  runTestSpecs(htmlSpecs, tester, {});
  runTestSpecs(jsdocSpecs, tester, {
    jsdoc: true,
  });
  runTestSpecs(linkSpecs, tester, {
    jsdoc: true,
    links,
  });
  runTestSpecs(linkCssSpecs, tester, {
    linkClass: 'my-class',
    jsdoc: true,
    links,
  });
});
