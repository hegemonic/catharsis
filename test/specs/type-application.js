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

const en = {
  modifiers: require('../../res/en').modifiers,
};
const Types = require('../../lib/types');

const repeatable = {
  repeatable: true,
};

const stringArray = {
  type: Types.TypeApplication,
  expression: {
    type: Types.NameExpression,
    name: 'Array',
  },
  applications: [
    {
      type: Types.NameExpression,
      name: 'string',
    },
  ],
};
const stringArrayRepeatable = _.extend({}, stringArray, repeatable);

module.exports = [
  {
    description: 'array of strings, without a dot separator',
    expression: 'Array<string>',
    parsed: stringArray,
    described: {
      en: {
        simple: 'Array of string',
        extended: {
          description: 'Array of string',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'array of strings, with a dot separator',
    expression: 'Array.<string>',
    newExpression: 'Array<string>',
    parsed: stringArray,
    described: {
      en: {
        simple: 'Array of string',
        extended: {
          description: 'Array of string',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'repeatable array of strings',
    expression: '...Array<string>',
    parsed: stringArrayRepeatable,
    described: {
      en: {
        simple: 'repeatable Array of string',
        extended: {
          description: 'Array of string',
          modifiers: {
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'object whose properties are strings and property values are numbers',
    expression: 'Object<string, number>',
    parsed: {
      type: Types.TypeApplication,
      expression: {
        type: Types.NameExpression,
        name: 'Object',
      },
      applications: [
        {
          type: Types.NameExpression,
          name: 'string',
        },
        {
          type: Types.NameExpression,
          name: 'number',
        },
      ],
    },
    described: {
      en: {
        simple: 'Object with number properties',
        extended: {
          description: 'Object with number properties',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description:
      'object whose properties are a type application and property values are a type union',
    expression:
      'Object<Array<(boolean|{myKey: Error})>, (boolean|string|function(new:foo): string)>',
    parsed: {
      type: Types.TypeApplication,
      expression: {
        type: Types.NameExpression,
        name: 'Object',
      },
      applications: [
        {
          type: Types.TypeApplication,
          expression: {
            type: Types.NameExpression,
            name: 'Array',
          },
          applications: [
            {
              type: Types.TypeUnion,
              elements: [
                {
                  type: Types.NameExpression,
                  name: 'boolean',
                },
                {
                  type: Types.RecordType,
                  fields: [
                    {
                      type: Types.FieldType,
                      key: {
                        type: Types.NameExpression,
                        name: 'myKey',
                      },
                      value: {
                        type: Types.NameExpression,
                        name: 'Error',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: Types.TypeUnion,
          elements: [
            {
              type: Types.NameExpression,
              name: 'boolean',
            },
            {
              type: Types.NameExpression,
              name: 'string',
            },
            {
              type: Types.FunctionType,
              params: [],
              new: {
                type: Types.NameExpression,
                name: 'foo',
              },
              result: {
                type: Types.NameExpression,
                name: 'string',
              },
            },
          ],
        },
      ],
    },
    described: {
      en: {
        simple:
          'Object with Array of (boolean or {myKey: Error}) keys and ' +
          '(boolean, string, or function(constructs foo) returns string) properties',
        extended: {
          description:
            'Object with Array of (boolean or {myKey: Error}) keys and ' +
            '(boolean, string, or function(constructs foo) returns string) properties',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'array of objects that have a length property',
    expression: 'Array<{length}>',
    parsed: {
      type: Types.TypeApplication,
      expression: {
        type: Types.NameExpression,
        name: 'Array',
      },
      applications: [
        {
          type: Types.RecordType,
          fields: [
            {
              type: Types.FieldType,
              key: {
                type: Types.NameExpression,
                name: 'length',
              },
              value: undefined,
            },
          ],
        },
      ],
    },
    described: {
      en: {
        simple: 'Array of {length}',
        extended: {
          description: 'Array of {length}',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'array of unknown',
    expression: 'Array<?>',
    parsed: {
      type: Types.TypeApplication,
      expression: {
        type: Types.NameExpression,
        name: 'Array',
      },
      applications: [
        {
          type: Types.UnknownLiteral,
        },
      ],
    },
    described: {
      en: {
        simple: 'Array of unknown',
        extended: {
          description: 'Array of unknown',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'Promise containing string',
    expression: 'Promise<string>',
    parsed: {
      type: Types.TypeApplication,
      expression: {
        type: Types.NameExpression,
        name: 'Promise',
      },
      applications: [
        {
          type: Types.NameExpression,
          name: 'string',
        },
      ],
    },
    described: {
      en: {
        simple: 'Promise containing string',
        extended: {
          description: 'Promise containing string',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'foo.Promise containing string',
    expression: 'foo.Promise<string>',
    parsed: {
      type: Types.TypeApplication,
      expression: {
        type: Types.NameExpression,
        name: 'foo.Promise',
      },
      applications: [
        {
          type: Types.NameExpression,
          name: 'string',
        },
      ],
    },
    described: {
      en: {
        simple: 'foo.Promise containing string',
        extended: {
          description: 'foo.Promise containing string',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
];
