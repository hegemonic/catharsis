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

const Types = require('../../../lib/types');

module.exports = [
  {
    description: 'type application',
    expression: 'Array<Foo>',
    newExpression: 'Array&lt;<a href="Foo.html" class="my-class">Foo</a>&gt;',
    parsed: {
      type: Types.TypeApplication,
      expression: {
        type: Types.NameExpression,
        name: 'Array',
      },
      applications: [
        {
          type: Types.NameExpression,
          name: 'Foo',
        },
      ],
    },
    described: {
      en: {
        simple: 'Array of <a href="Foo.html" class="my-class">Foo</a>',
        extended: {
          description: 'Array of <a href="Foo.html" class="my-class">Foo</a>',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression for a class within a module',
    expression: 'module:foo/bar/baz~Qux',
    newExpression: '<a href="foobarbazqux.html" class="my-class">module:foo/bar/baz~Qux</a>',
    parsed: {
      type: Types.NameExpression,
      name: 'module:foo/bar/baz~Qux',
    },
    described: {
      en: {
        simple: '<a href="foobarbazqux.html" class="my-class">module:foo/bar/baz~Qux</a>',
        extended: {
          description: '<a href="foobarbazqux.html" class="my-class">module:foo/bar/baz~Qux</a>',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
];
