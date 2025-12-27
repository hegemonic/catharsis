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

const util = require('util');

const TAG_OPEN = '<foo class="code-class">';
const TAG_CLOSE = '</foo>';

function addTags(string) {
  const formatParams = [string];
  const matches = string.match(/%s/g);

  // tags must be balanced
  if (matches.length % 2 !== 0) {
    throw new Error(`Unable to add tags to ${string} because the placeholders are not balanced.`);
  }

  for (let i = 0, l = matches.length / 2; i < l; i++) {
    formatParams.push(TAG_OPEN, TAG_CLOSE);
  }

  return util.format(...formatParams);
}

module.exports = [
  {
    description: 'type application for an array',
    expression: 'Array.<string>',
    described: {
      en: {
        simple: addTags('%sArray%s of %sstring%s'),
        extended: {
          description: addTags('%sArray%s of %sstring%s'),
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'type application for an object with string keys',
    expression: 'Object.<string, number>',
    described: {
      en: {
        simple: addTags('%sObject%s with %snumber%s properties'),
        extended: {
          description: addTags('%sObject%s with %snumber%s properties'),
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'type application for an object with non-string keys',
    expression: 'Object.<boolean, string>',
    described: {
      en: {
        simple: addTags('%sObject%s with %sboolean%s keys and %sstring%s properties'),
        extended: {
          description: addTags('%sObject%s with %sboolean%s keys and %sstring%s properties'),
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'function type with parameters and new, this, and returns modifiers',
    expression: 'function(new:foo.bar, this: foo.baz, string): boolean',
    described: {
      en: {
        simple: addTags(
          'function(constructs %sfoo.bar%s, %sthis%s = %sfoo.baz%s, ' +
            '%sstring%s) returns %sboolean%s'
        ),
        extended: {
          description: addTags('function(%sstring%s)'),
          modifiers: {
            functionNew: addTags('Returns %sfoo.bar%s when called with %snew%s.'),
            functionThis: addTags('Within the function, %sthis%s refers to %sfoo.baz%s.'),
          },
          returns: addTags('Returns %sboolean%s.'),
        },
      },
    },
  },
];
