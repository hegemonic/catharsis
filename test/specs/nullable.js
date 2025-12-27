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

const optional = {
  optional: true,
};
const repeatable = {
  repeatable: true,
};

const nullableNumber = {
  type: Types.NameExpression,
  name: 'number',
  nullable: true,
};
const nullableNumberOptional = _.extend({}, nullableNumber, optional);
const nullableNumberOptionalRepeatable = _.extend({}, nullableNumber, optional, repeatable);
const nullableNumberRepeatable = _.extend({}, nullableNumber, repeatable);

const nonNullableObject = {
  type: Types.NameExpression,
  name: 'Object',
  nullable: false,
};
const nonNullableObjectOptional = _.extend({}, nonNullableObject, optional);
const nonNullableObjectOptionalRepeatable = _.extend({}, nonNullableObject, optional, repeatable);
const nonNullableObjectRepeatable = _.extend({}, nonNullableObject, repeatable);

module.exports = [
  {
    description: 'nullable number',
    expression: '?number',
    parsed: nullableNumber,
    described: {
      en: {
        simple: 'nullable number',
        extended: {
          description: 'number',
          modifiers: {
            nullable: en.modifiers.extended.nullable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'postfix nullable number',
    expression: 'number?',
    newExpression: '?number',
    parsed: nullableNumber,
    described: {
      en: {
        simple: 'nullable number',
        extended: {
          description: 'number',
          modifiers: {
            nullable: en.modifiers.extended.nullable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'non-nullable object',
    expression: '!Object',
    parsed: nonNullableObject,
    described: {
      en: {
        simple: 'non-null Object',
        extended: {
          description: 'Object',
          modifiers: {
            nullable: en.modifiers.extended.nonNullable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'postfix non-nullable object',
    expression: 'Object!',
    newExpression: '!Object',
    parsed: nonNullableObject,
    described: {
      en: {
        simple: 'non-null Object',
        extended: {
          description: 'Object',
          modifiers: {
            nullable: en.modifiers.extended.nonNullable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'repeatable nullable number',
    expression: '...?number',
    parsed: nullableNumberRepeatable,
    described: {
      en: {
        simple: 'nullable repeatable number',
        extended: {
          description: 'number',
          modifiers: {
            nullable: en.modifiers.extended.nullable,
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'postfix repeatable nullable number',
    expression: '...number?',
    newExpression: '...?number',
    parsed: nullableNumberRepeatable,
    described: {
      en: {
        simple: 'nullable repeatable number',
        extended: {
          description: 'number',
          modifiers: {
            nullable: en.modifiers.extended.nullable,
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'repeatable non-nullable object',
    expression: '...!Object',
    parsed: nonNullableObjectRepeatable,
    described: {
      en: {
        simple: 'non-null repeatable Object',
        extended: {
          description: 'Object',
          modifiers: {
            nullable: en.modifiers.extended.nonNullable,
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'postfix repeatable non-nullable object',
    expression: '...Object!',
    newExpression: '...!Object',
    parsed: nonNullableObjectRepeatable,
    described: {
      en: {
        simple: 'non-null repeatable Object',
        extended: {
          description: 'Object',
          modifiers: {
            nullable: en.modifiers.extended.nonNullable,
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'postfix optional nullable number',
    expression: 'number=?',
    newExpression: '?number=',
    parsed: nullableNumberOptional,
    described: {
      en: {
        simple: 'optional nullable number',
        extended: {
          description: 'number',
          modifiers: {
            nullable: en.modifiers.extended.nullable,
            optional: en.modifiers.extended.optional,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'postfix nullable optional number',
    expression: 'number?=',
    newExpression: '?number=',
    parsed: nullableNumberOptional,
    described: {
      en: {
        simple: 'optional nullable number',
        extended: {
          description: 'number',
          modifiers: {
            nullable: en.modifiers.extended.nullable,
            optional: en.modifiers.extended.optional,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'postfix repeatable nullable optional number',
    expression: '...number?=',
    newExpression: '...?number=',
    parsed: nullableNumberOptionalRepeatable,
    described: {
      en: {
        simple: 'optional nullable repeatable number',
        extended: {
          description: 'number',
          modifiers: {
            nullable: en.modifiers.extended.nullable,
            optional: en.modifiers.extended.optional,
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'postfix optional non-nullable object',
    expression: 'Object=!',
    newExpression: '!Object=',
    parsed: nonNullableObjectOptional,
    described: {
      en: {
        simple: 'optional non-null Object',
        extended: {
          description: 'Object',
          modifiers: {
            nullable: en.modifiers.extended.nonNullable,
            optional: en.modifiers.extended.optional,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'postfix non-nullable optional object',
    expression: 'Object!=',
    newExpression: '!Object=',
    parsed: nonNullableObjectOptional,
    described: {
      en: {
        simple: 'optional non-null Object',
        extended: {
          description: 'Object',
          modifiers: {
            nullable: en.modifiers.extended.nonNullable,
            optional: en.modifiers.extended.optional,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'postfix repeatable non-nullable optional object',
    expression: '...Object!=',
    newExpression: '...!Object=',
    parsed: nonNullableObjectOptionalRepeatable,
    described: {
      en: {
        simple: 'optional non-null repeatable Object',
        extended: {
          description: 'Object',
          modifiers: {
            nullable: en.modifiers.extended.nonNullable,
            optional: en.modifiers.extended.optional,
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
];
