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

const basicFunction = {
  type: Types.FunctionType,
  params: [
    {
      type: Types.NameExpression,
      name: 'string',
    },
    {
      type: Types.NameExpression,
      name: 'boolean',
    },
  ],
};
const basicFunctionRepeatable = _.extend({}, basicFunction, repeatable);

const booleanResult = {
  result: {
    type: Types.NameExpression,
    name: 'boolean',
  },
};
const basicFunctionWithResult = _.extend({}, basicFunction, booleanResult);
const basicFunctionRepeatableWithResult = _.extend({}, basicFunctionRepeatable, booleanResult);

module.exports = [
  {
    description: 'function with two basic parameters',
    expression: 'function(string, boolean)',
    parsed: basicFunction,
    described: {
      en: {
        simple: 'function(string, boolean)',
        extended: {
          description: 'function(string, boolean)',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'repeatable function with two basic parameters',
    expression: '...function(string, boolean)',
    parsed: basicFunctionRepeatable,
    described: {
      en: {
        simple: 'repeatable function(string, boolean)',
        extended: {
          description: 'function(string, boolean)',
          modifiers: {
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'function with two basic parameters and a return value',
    expression: 'function(string, boolean): boolean',
    parsed: basicFunctionWithResult,
    described: {
      en: {
        simple: 'function(string, boolean) returns boolean',
        extended: {
          description: 'function(string, boolean)',
          modifiers: {},
          returns: 'Returns boolean.',
        },
      },
    },
  },
  {
    description: 'repeatable function with two basic parameters and a return value',
    expression: '...function(string, boolean): boolean',
    parsed: basicFunctionRepeatableWithResult,
    described: {
      en: {
        simple: 'repeatable function(string, boolean) returns boolean',
        extended: {
          description: 'function(string, boolean)',
          modifiers: {
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: 'Returns boolean.',
        },
      },
    },
  },
  {
    description: 'optional function with one basic parameter',
    expression: 'function(string)=',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.NameExpression,
          name: 'string',
        },
      ],
      optional: true,
    },
    described: {
      en: {
        simple: 'optional function(string)',
        extended: {
          description: 'function(string)',
          modifiers: {
            optional: en.modifiers.extended.optional,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'function with no parameters and a return value',
    expression: 'function(): number',
    parsed: {
      type: Types.FunctionType,
      params: [],
      result: {
        type: Types.NameExpression,
        name: 'number',
      },
    },
    described: {
      en: {
        simple: 'function() returns number',
        extended: {
          description: 'function()',
          modifiers: {},
          returns: 'Returns number.',
        },
      },
    },
  },
  {
    description: 'function with a "this" type and no parameters',
    expression: 'function(this:goog.ui.Menu)',
    parsed: {
      type: Types.FunctionType,
      params: [],
      this: {
        type: Types.NameExpression,
        name: 'goog.ui.Menu',
      },
    },
    described: {
      en: {
        simple: 'function(this = goog.ui.Menu)',
        extended: {
          description: 'function()',
          modifiers: {
            functionThis: 'Within the function, this refers to goog.ui.Menu.',
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'function with a "this" type and one parameter',
    expression: 'function(this:goog.ui.Menu, string)',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.NameExpression,
          name: 'string',
        },
      ],
      this: {
        type: Types.NameExpression,
        name: 'goog.ui.Menu',
      },
    },
    described: {
      en: {
        simple: 'function(this = goog.ui.Menu, string)',
        extended: {
          description: 'function(string)',
          modifiers: {
            functionThis: 'Within the function, this refers to goog.ui.Menu.',
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'function with a "new" type and no parameters',
    expression: 'function(new:goog.ui.Menu)',
    parsed: {
      type: Types.FunctionType,
      params: [],
      new: {
        type: Types.NameExpression,
        name: 'goog.ui.Menu',
      },
    },
    described: {
      en: {
        simple: 'function(constructs goog.ui.Menu)',
        extended: {
          description: 'function()',
          modifiers: {
            functionNew: 'Returns goog.ui.Menu when called with new.',
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'function with a "new" type and one parameter',
    expression: 'function(new:goog.ui.Menu, string)',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.NameExpression,
          name: 'string',
        },
      ],
      new: {
        type: Types.NameExpression,
        name: 'goog.ui.Menu',
      },
    },
    described: {
      en: {
        simple: 'function(constructs goog.ui.Menu, string)',
        extended: {
          description: 'function(string)',
          modifiers: {
            functionNew: 'Returns goog.ui.Menu when called with new.',
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'function with a "new" and "this" type and no parameters',
    expression: 'function(new:goog.ui.Menu, this:goog.ui)',
    parsed: {
      type: Types.FunctionType,
      params: [],
      new: {
        type: Types.NameExpression,
        name: 'goog.ui.Menu',
      },
      this: {
        type: Types.NameExpression,
        name: 'goog.ui',
      },
    },
    described: {
      en: {
        simple: 'function(constructs goog.ui.Menu, this = goog.ui)',
        extended: {
          description: 'function()',
          modifiers: {
            functionNew: 'Returns goog.ui.Menu when called with new.',
            functionThis: 'Within the function, this refers to goog.ui.',
          },
          returns: '',
        },
      },
    },
  },
  {
    description:
      'function with a fixed parameter, followed by a variable number of ' +
      'parameters, as well as a return value',
    expression: 'function(string, ...[number]): number',
    newExpression: 'function(string, ...number): number',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.NameExpression,
          name: 'string',
        },
        {
          type: Types.NameExpression,
          name: 'number',
          repeatable: true,
        },
      ],
      result: {
        type: Types.NameExpression,
        name: 'number',
      },
    },
    described: {
      en: {
        simple: 'function(string, repeatable number) returns number',
        extended: {
          description: 'function(string, repeatable number)',
          modifiers: {},
          returns: 'Returns number.',
        },
      },
    },
  },
  {
    description: 'function with a variable number of parameters containing the value `null`',
    expression: 'function(...[null])',
    newExpression: 'function(...null)',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.NullLiteral,
          repeatable: true,
        },
      ],
    },
    described: {
      en: {
        simple: 'function(repeatable null)',
        extended: {
          description: 'function(repeatable null)',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'function with a variable number of parameters containing the value `undefined`',
    expression: 'function(...[undefined])',
    newExpression: 'function(...undefined)',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.UndefinedLiteral,
          repeatable: true,
        },
      ],
    },
    described: {
      en: {
        simple: 'function(repeatable undefined)',
        extended: {
          description: 'function(repeatable undefined)',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description:
      'function with a variable number of parameters, a "new" type, a "this" ' +
      'type, and a return value',
    expression:
      'function(new:Master, this:Everyone, string, goog.ui.Menu, Array<Object>, ' +
      '...[string]): boolean',
    newExpression:
      'function(new:Master, this:Everyone, string, goog.ui.Menu, Array<Object>, ' +
      '...string): boolean',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.NameExpression,
          name: 'string',
        },
        {
          type: Types.NameExpression,
          name: 'goog.ui.Menu',
        },
        {
          type: Types.TypeApplication,
          expression: {
            type: Types.NameExpression,
            name: 'Array',
          },
          applications: [
            {
              type: Types.NameExpression,
              name: 'Object',
            },
          ],
        },
        {
          type: Types.NameExpression,
          name: 'string',
          repeatable: true,
        },
      ],
      new: {
        type: Types.NameExpression,
        name: 'Master',
      },
      this: {
        type: Types.NameExpression,
        name: 'Everyone',
      },
      result: {
        type: Types.NameExpression,
        name: 'boolean',
      },
    },
    described: {
      en: {
        simple:
          'function(constructs Master, this = Everyone, string, goog.ui.Menu, ' +
          'Array of Object, repeatable string) returns boolean',
        extended: {
          description: 'function(string, goog.ui.Menu, Array of Object, repeatable string)',
          modifiers: {
            functionNew: 'Returns Master when called with new.',
            functionThis: 'Within the function, this refers to Everyone.',
          },
          returns: 'Returns boolean.',
        },
      },
    },
  },
  {
    description: 'function with a repeatable param that is not enclosed in brackets',
    expression: 'function(...foo)',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.NameExpression,
          name: 'foo',
          repeatable: true,
        },
      ],
    },
    described: {
      en: {
        simple: 'function(repeatable foo)',
        extended: {
          description: 'function(repeatable foo)',
          modifiers: {},
          returns: '',
        },
      },
    },
  },

  // The following type expressions are adapted from the Closure Compiler test suite:
  // http://goo.gl/rgKSk
  {
    description: 'function that returns a type union',
    expression: 'function(): (number|string)',
    parsed: {
      type: Types.FunctionType,
      params: [],
      result: {
        type: Types.TypeUnion,
        elements: [
          {
            type: Types.NameExpression,
            name: 'number',
          },
          {
            type: Types.NameExpression,
            name: 'string',
          },
        ],
      },
    },
    described: {
      en: {
        simple: 'function() returns (number or string)',
        extended: {
          description: 'function()',
          modifiers: {},
          returns: 'Returns (number or string).',
        },
      },
    },
  },
  {
    description: 'function with no parameters and no return value',
    expression: 'function()',
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
    description: 'function with a variable number of parameters containing any values',
    expression: 'function(...[*])',
    newExpression: 'function(...*)',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.AllLiteral,
          repeatable: true,
        },
      ],
    },
    described: {
      en: {
        simple: 'function(repeatable any type)',
        extended: {
          description: 'function(repeatable any type)',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'function with a "this" type that returns a type union',
    expression: 'function(this:Object): (number|string)',
    parsed: {
      type: Types.FunctionType,
      params: [],
      this: {
        type: Types.NameExpression,
        name: 'Object',
      },
      result: {
        type: Types.TypeUnion,
        elements: [
          {
            type: Types.NameExpression,
            name: 'number',
          },
          {
            type: Types.NameExpression,
            name: 'string',
          },
        ],
      },
    },
    described: {
      en: {
        simple: 'function(this = Object) returns (number or string)',
        extended: {
          description: 'function()',
          modifiers: {
            functionThis: 'Within the function, this refers to Object.',
          },
          returns: 'Returns (number or string).',
        },
      },
    },
  },
  {
    description: 'function with a "this" type that is a type union, and that returns a type union',
    expression: 'function(this:(Array|Date)): (number|string)',
    parsed: {
      type: Types.FunctionType,
      params: [],
      this: {
        type: Types.TypeUnion,
        elements: [
          {
            type: Types.NameExpression,
            name: 'Array',
          },
          {
            type: Types.NameExpression,
            name: 'Date',
          },
        ],
      },
      result: {
        type: Types.TypeUnion,
        elements: [
          {
            type: Types.NameExpression,
            name: 'number',
          },
          {
            type: Types.NameExpression,
            name: 'string',
          },
        ],
      },
    },
    described: {
      en: {
        simple: 'function(this = (Array or Date)) returns (number or string)',
        extended: {
          description: 'function()',
          modifiers: {
            functionThis: 'Within the function, this refers to (Array or Date).',
          },
          returns: 'Returns (number or string).',
        },
      },
    },
  },
  {
    description:
      'function with a "new" type and a variable number of params that accept ' +
      'all types, returning a name expression',
    expression: 'function(new:Array, ...[*]): Array',
    newExpression: 'function(new:Array, ...*): Array',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.AllLiteral,
          repeatable: true,
        },
      ],
      new: {
        type: Types.NameExpression,
        name: 'Array',
      },
      result: {
        type: Types.NameExpression,
        name: 'Array',
      },
    },
    described: {
      en: {
        simple: 'function(constructs Array, repeatable any type) returns Array',
        extended: {
          description: 'function(repeatable any type)',
          modifiers: {
            functionNew: 'Returns Array when called with new.',
          },
          returns: 'Returns Array.',
        },
      },
    },
  },
  {
    description:
      'function with a "new" type that accepts an optional parameter of any ' +
      'type, as well as a return value',
    expression: 'function(new:Boolean, *=): boolean',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.AllLiteral,
          optional: true,
        },
      ],
      new: {
        type: Types.NameExpression,
        name: 'Boolean',
      },
      result: {
        type: Types.NameExpression,
        name: 'boolean',
      },
    },
    described: {
      en: {
        simple: 'function(constructs Boolean, optional any type) returns boolean',
        extended: {
          description: 'function(optional any type)',
          modifiers: {
            functionNew: 'Returns Boolean when called with new.',
          },
          returns: 'Returns boolean.',
        },
      },
    },
  },
  {
    description: 'function with a variable number of parameters and a return value',
    expression: 'function(...[number]): boolean',
    newExpression: 'function(...number): boolean',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.NameExpression,
          name: 'number',
          repeatable: true,
        },
      ],
      result: {
        type: Types.NameExpression,
        name: 'boolean',
      },
    },
    described: {
      en: {
        simple: 'function(repeatable number) returns boolean',
        extended: {
          description: 'function(repeatable number)',
          modifiers: {},
          returns: 'Returns boolean.',
        },
      },
    },
  },
  {
    description: 'function with a "this" type and a parameter that returns a type union',
    expression: 'function(this:Date, number): (boolean|number|string)',
    parsed: {
      type: Types.FunctionType,
      params: [
        {
          type: Types.NameExpression,
          name: 'number',
        },
      ],
      this: {
        type: Types.NameExpression,
        name: 'Date',
      },
      result: {
        type: Types.TypeUnion,
        elements: [
          {
            type: Types.NameExpression,
            name: 'boolean',
          },
          {
            type: Types.NameExpression,
            name: 'number',
          },
          {
            type: Types.NameExpression,
            name: 'string',
          },
        ],
      },
    },
    described: {
      en: {
        simple: 'function(this = Date, number) returns (boolean, number, or string)',
        extended: {
          description: 'function(number)',
          modifiers: {
            functionThis: 'Within the function, this refers to Date.',
          },
          returns: 'Returns (boolean, number, or string).',
        },
      },
    },
  },
];
