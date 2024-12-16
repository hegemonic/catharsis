const _ = require('lodash');

const en = {
  modifiers: require('../../res/en').modifiers,
};
const Types = require('../../lib/types');

const repeatable = {
  repeatable: true,
};

const simpleRecordType = {
  type: Types.RecordType,
  fields: [
    {
      type: Types.FieldType,
      key: {
        type: Types.NameExpression,
        name: 'myNum',
      },
      value: {
        type: Types.NameExpression,
        name: 'number',
      },
    },
  ],
};
const simpleRecordTypeRepeatable = _.extend({}, simpleRecordType, repeatable);

module.exports = [
  {
    description: 'empty record type',
    expression: '{}',
    parsed: {
      type: Types.RecordType,
      fields: [],
    },
    described: {
      en: {
        simple: '{}',
        extended: {
          description: '{}',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'record type with 1 typed property',
    expression: '{myNum: number}',
    parsed: simpleRecordType,
    described: {
      en: {
        simple: '{myNum: number}',
        extended: {
          description: '{myNum: number}',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'repeatable record type with 1 typed property',
    expression: '...{myNum: number}',
    parsed: simpleRecordTypeRepeatable,
    described: {
      en: {
        simple: 'repeatable {myNum: number}',
        extended: {
          description: '{myNum: number}',
          modifiers: {
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'optional record type with 1 typed property',
    expression: '{myNum: number}=',
    parsed: {
      type: Types.RecordType,
      fields: [
        {
          type: Types.FieldType,
          key: {
            type: Types.NameExpression,
            name: 'myNum',
          },
          value: {
            type: Types.NameExpression,
            name: 'number',
          },
        },
      ],
      optional: true,
    },
    described: {
      en: {
        simple: 'optional {myNum: number}',
        extended: {
          description: '{myNum: number}',
          modifiers: {
            optional: en.modifiers.extended.optional,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'nullable record type with 1 typed property',
    expression: '?{myNum: number}',
    parsed: {
      type: Types.RecordType,
      fields: [
        {
          type: Types.FieldType,
          key: {
            type: Types.NameExpression,
            name: 'myNum',
          },
          value: {
            type: Types.NameExpression,
            name: 'number',
          },
        },
      ],
      nullable: true,
    },
    described: {
      en: {
        simple: 'nullable {myNum: number}',
        extended: {
          description: '{myNum: number}',
          modifiers: {
            nullable: en.modifiers.extended.nullable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'non-nullable record type with 1 typed property',
    expression: '!{myNum: number}',
    parsed: {
      type: Types.RecordType,
      fields: [
        {
          type: Types.FieldType,
          key: {
            type: Types.NameExpression,
            name: 'myNum',
          },
          value: {
            type: Types.NameExpression,
            name: 'number',
          },
        },
      ],
      nullable: false,
    },
    described: {
      en: {
        simple: 'non-null {myNum: number}',
        extended: {
          description: '{myNum: number}',
          modifiers: {
            nullable: en.modifiers.extended.nonNullable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'record type with 1 typed property and 1 untyped property',
    expression: '{myNum: number, myObject}',
    parsed: {
      type: Types.RecordType,
      fields: [
        {
          type: Types.FieldType,
          key: {
            type: Types.NameExpression,
            name: 'myNum',
          },
          value: {
            type: Types.NameExpression,
            name: 'number',
          },
        },
        {
          type: Types.FieldType,
          key: {
            type: Types.NameExpression,
            name: 'myObject',
          },
          value: undefined,
        },
      ],
    },
    described: {
      en: {
        simple: '{myNum: number, myObject}',
        extended: {
          description: '{myNum: number, myObject}',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'record type with a property that uses a type application as a value',
    expression: '{myArray: Array<string>}',
    parsed: {
      type: Types.RecordType,
      fields: [
        {
          type: Types.FieldType,
          key: {
            type: Types.NameExpression,
            name: 'myArray',
          },
          value: {
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
        },
      ],
    },
    described: {
      en: {
        simple: '{myArray: Array of string}',
        extended: {
          description: '{myArray: Array of string}',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'record type with a property that uses a type union as a value',
    expression: '{myKey: (number|boolean|string)}',
    parsed: {
      type: Types.RecordType,
      fields: [
        {
          type: Types.FieldType,
          key: {
            type: Types.NameExpression,
            name: 'myKey',
          },
          value: {
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
        },
      ],
    },
    described: {
      en: {
        simple: '{myKey: (number, boolean, or string)}',
        extended: {
          description: '{myKey: (number, boolean, or string)}',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'record type with a property that uses a JavaScript keyword as a key',
    expression: '{continue: string}',
    parsed: {
      type: Types.RecordType,
      fields: [
        {
          type: Types.FieldType,
          key: {
            type: Types.NameExpression,
            name: 'continue',
            reservedWord: true,
          },
          value: {
            type: Types.NameExpression,
            name: 'string',
          },
        },
      ],
    },
    described: {
      en: {
        simple: '{continue: string}',
        extended: {
          description: '{continue: string}',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'record type with a property that uses a JavaScript future reserved word as a key',
    expression: '{class: string}',
    parsed: {
      type: Types.RecordType,
      fields: [
        {
          type: Types.FieldType,
          key: {
            type: Types.NameExpression,
            name: 'class',
            reservedWord: true,
          },
          value: {
            type: Types.NameExpression,
            name: 'string',
          },
        },
      ],
    },
    described: {
      en: {
        simple: '{class: string}',
        extended: {
          description: '{class: string}',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description:
      'record type with a property that uses a string representation of a ' +
      'JavaScript boolean literal as a key',
    expression: '{true: string}',
    parsed: {
      type: Types.RecordType,
      fields: [
        {
          type: Types.FieldType,
          key: {
            type: Types.NameExpression,
            name: 'true',
            reservedWord: true,
          },
          value: {
            type: Types.NameExpression,
            name: 'string',
          },
        },
      ],
    },
    described: {
      en: {
        simple: '{true: string}',
        extended: {
          description: '{true: string}',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'record type with a property that uses a numeric key',
    expression: '{0: string}',
    parsed: {
      type: Types.RecordType,
      fields: [
        {
          type: Types.FieldType,
          key: {
            type: Types.NameExpression,
            name: '0',
          },
          value: {
            type: Types.NameExpression,
            name: 'string',
          },
        },
      ],
    },
    described: {
      en: {
        simple: '{0: string}',
        extended: {
          description: '{0: string}',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
];
