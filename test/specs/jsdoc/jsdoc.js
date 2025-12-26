const Types = require('../../../lib/types');

module.exports = [
  {
    description: 'name expression with instance scope punctuation',
    expression: 'MyClass#myMember',
    parsed: {
      type: Types.NameExpression,
      name: 'MyClass#myMember',
    },
    described: {
      en: {
        simple: 'MyClass#myMember',
        extended: {
          description: 'MyClass#myMember',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression with inner scope punctuation',
    expression: 'MyClass~myMember',
    parsed: {
      type: Types.NameExpression,
      name: 'MyClass~myMember',
    },
    described: {
      en: {
        simple: 'MyClass~myMember',
        extended: {
          description: 'MyClass~myMember',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression with instance and inner scope punctuation',
    expression: 'MyClass#myMember#yourMember~theirMember',
    parsed: {
      type: Types.NameExpression,
      name: 'MyClass#myMember#yourMember~theirMember',
    },
    described: {
      en: {
        simple: 'MyClass#myMember#yourMember~theirMember',
        extended: {
          description: 'MyClass#myMember#yourMember~theirMember',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression for a class within a module',
    expression: 'module:foo/bar/baz~Qux',
    parsed: {
      type: Types.NameExpression,
      name: 'module:foo/bar/baz~Qux',
    },
    described: {
      en: {
        simple: 'module:foo/bar/baz~Qux',
        extended: {
          description: 'module:foo/bar/baz~Qux',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression for a class within a module with hyphens',
    expression: 'module:foo-bar/baz~Qux',
    parsed: {
      type: Types.NameExpression,
      name: 'module:foo-bar/baz~Qux',
    },
    described: {
      en: {
        simple: 'module:foo-bar/baz~Qux',
        extended: {
          description: 'module:foo-bar/baz~Qux',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression that includes an @ sign',
    expression: 'module:@prefix/my-module~myCallback',
    parsed: {
      type: Types.NameExpression,
      name: 'module:@prefix/my-module~myCallback',
    },
    described: {
      en: {
        simple: 'module:@prefix/my-module~myCallback',
        extended: {
          description: 'module:@prefix/my-module~myCallback',
          modifiers: {},
          returns: '',
        },
      },
    },
  },

  {
    description: 'name expression for a symbol variation whose name is an empty string',
    expression: 'MyClass()',
    parsed: {
      type: Types.NameExpression,
      name: 'MyClass()',
    },
    described: {
      en: {
        simple: 'MyClass()',
        extended: {
          description: 'MyClass()',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression for a symbol variation whose name is one numeral',
    expression: 'MyClass(2)',
    parsed: {
      type: Types.NameExpression,
      name: 'MyClass(2)',
    },
    described: {
      en: {
        simple: 'MyClass(2)',
        extended: {
          description: 'MyClass(2)',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression for a symbol variation whose name is multiple numerals',
    expression: 'MyClass(23456)',
    parsed: {
      type: Types.NameExpression,
      name: 'MyClass(23456)',
    },
    described: {
      en: {
        simple: 'MyClass(23456)',
        extended: {
          description: 'MyClass(23456)',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression for a symbol variation whose name is one letter',
    expression: 'MyClass(a)',
    parsed: {
      type: Types.NameExpression,
      name: 'MyClass(a)',
    },
    described: {
      en: {
        simple: 'MyClass(a)',
        extended: {
          description: 'MyClass(a)',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression for a symbol variation whose name is multiple letters',
    expression: 'MyClass(abcde)',
    parsed: {
      type: Types.NameExpression,
      name: 'MyClass(abcde)',
    },
    described: {
      en: {
        simple: 'MyClass(abcde)',
        extended: {
          description: 'MyClass(abcde)',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression enclosed in double quotes',
    expression: '"foo.bar.baz"',
    parsed: {
      type: Types.NameExpression,
      name: '"foo.bar.baz"',
    },
    described: {
      en: {
        simple: '"foo.bar.baz"',
        extended: {
          description: '"foo.bar.baz"',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression enclosed in single quotes',
    expression: "'foo.bar.baz'",
    parsed: {
      type: Types.NameExpression,
      name: "'foo.bar.baz'",
    },
    described: {
      en: {
        simple: "'foo.bar.baz'",
        extended: {
          description: "'foo.bar.baz'",
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name expression with JSDoc scope punctuation and a bracketed property',
    expression: 'Foo#[Symbol.iterator]',
    parsed: {
      type: Types.NameExpression,
      name: 'Foo#[Symbol.iterator]',
    },
    described: {
      en: {
        simple: 'Foo#[Symbol.iterator]',
        extended: {
          description: 'Foo#[Symbol.iterator]',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'identifier with a repeatable param that is not enclosed in brackets',
    expression: 'MyClass(...foo)',
    parsed: {
      type: Types.NameExpression,
      name: 'MyClass(...foo)',
    },
    described: {
      en: {
        simple: 'MyClass(...foo)',
        extended: {
          description: 'MyClass(...foo)',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'Jsdoc Toolkit 2-style array notation for an array of strings',
    expression: 'string[]',
    newExpression: 'Array<string>',
    parsed: {
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
    },
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
    description: 'Jsdoc Toolkit 2-style array notation for an array of functions',
    expression: 'function[]',
    newExpression: 'Array<function()>',
    parsed: {
      type: Types.TypeApplication,
      expression: {
        type: Types.NameExpression,
        name: 'Array',
      },
      applications: [
        {
          type: Types.FunctionType,
          params: [],
        },
      ],
    },
    described: {
      en: {
        simple: 'Array of function()',
        extended: {
          description: 'Array of function()',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'Jsdoc Toolkit 2-style nested array (two levels)',
    expression: 'number[][]',
    newExpression: 'Array<Array<number>>',
    parsed: {
      type: Types.TypeApplication,
      expression: {
        type: Types.NameExpression,
        name: 'Array',
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
              type: Types.NameExpression,
              name: 'number',
            },
          ],
        },
      ],
    },
    described: {
      en: {
        simple: 'Array of Array of number',
        extended: {
          description: 'Array of Array of number',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'Jsdoc Toolkit 2-style nested array (three levels)',
    expression: 'number[][][]',
    newExpression: 'Array<Array<Array<number>>>',
    parsed: {
      type: Types.TypeApplication,
      expression: {
        type: Types.NameExpression,
        name: 'Array',
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
              type: Types.TypeApplication,
              expression: {
                type: Types.NameExpression,
                name: 'Array',
              },
              applications: [
                {
                  type: Types.NameExpression,
                  name: 'number',
                },
              ],
            },
          ],
        },
      ],
    },
    described: {
      en: {
        simple: 'Array of Array of Array of number',
        extended: {
          description: 'Array of Array of Array of number',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'record type with a property that uses a type union as a key',
    expression: '{(number|boolean|string): number}',
    parsed: {
      type: Types.RecordType,
      fields: [
        {
          type: Types.FieldType,
          key: {
            type: Types.TypeUnion,
            elements: [
              {
                type: Types.NameExpression,
                name: 'number',
              },
              {
                type: Types.NameExpression,
                name: 'boolean',
              },
              {
                type: Types.NameExpression,
                name: 'string',
              },
            ],
          },
          value: {
            type: Types.NameExpression,
            name: 'number',
          },
        },
      ],
    },
    described: {
      en: {
        simple: '{(number, boolean, or string): number}',
        extended: {
          description: '{(number, boolean, or string): number}',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'function type with no trailing pathentheses',
    expression: 'function',
    newExpression: 'function()',
    parsed: {
      type: Types.FunctionType,
      params: [],
    },
    described: {
      en: {
        simple: 'function()',
        extended: {
          description: 'function()',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'type union with no parentheses, a repeatable param, and a JSDoc-style array',
    expression: '...string|string[]',
    newExpression: '(...string|Array<string>)',
    parsed: {
      type: 'TypeUnion',
      elements: [
        {
          type: 'NameExpression',
          name: 'string',
          repeatable: true,
        },
        {
          type: 'TypeApplication',
          expression: {
            type: 'NameExpression',
            name: 'Array',
          },
          applications: [
            {
              name: 'string',
              type: 'NameExpression',
            },
          ],
        },
      ],
    },
    described: {
      en: {
        simple: '(repeatable string or Array of string)',
        extended: {
          description: '(repeatable string or Array of string)',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
];
