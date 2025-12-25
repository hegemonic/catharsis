const en = {
  modifiers: require('../../res/en').modifiers,
};
const Types = require('../../lib/types');

module.exports = [
  {
    description: 'boolean',
    expression: 'boolean',
    parsed: {
      type: Types.NameExpression,
      name: 'boolean',
    },
    described: {
      en: {
        simple: 'boolean',
        extended: {
          description: 'boolean',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'object',
    expression: 'Window',
    parsed: {
      type: Types.NameExpression,
      name: 'Window',
    },
    described: {
      en: {
        simple: 'Window',
        extended: {
          description: 'Window',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'object with properties',
    expression: 'goog.ui.Menu',
    parsed: {
      type: Types.NameExpression,
      name: 'goog.ui.Menu',
    },
    described: {
      en: {
        simple: 'goog.ui.Menu',
        extended: {
          description: 'goog.ui.Menu',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'object with a single-quoted string-literal property',
    expression: "myObj.'myProp'.foo",
    parsed: {
      type: Types.NameExpression,
      name: "myObj.'myProp'.foo",
    },
    described: {
      en: {
        simple: "myObj.'myProp'.foo",
        extended: {
          description: "myObj.'myProp'.foo",
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'object with a double-quoted string-literal property',
    expression: 'myObj."myProp".foo',
    parsed: {
      type: Types.NameExpression,
      name: 'myObj."myProp".foo',
    },
    described: {
      en: {
        simple: 'myObj."myProp".foo',
        extended: {
          description: 'myObj."myProp".foo',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'object with a double-quoted property that looks like a property chain',
    expression: 'foo."bar.baz".qux',
    parsed: {
      type: Types.NameExpression,
      name: 'foo."bar.baz".qux',
    },
    described: {
      en: {
        simple: 'foo."bar.baz".qux',
        extended: {
          description: 'foo."bar.baz".qux',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'object with a single-quoted property that looks like a property chain',
    expression: "foo.'bar.baz'.qux",
    parsed: {
      type: Types.NameExpression,
      name: "foo.'bar.baz'.qux",
    },
    described: {
      en: {
        simple: "foo.'bar.baz'.qux",
        extended: {
          description: "foo.'bar.baz'.qux",
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'object with a string-literal property that includes other punctuation',
    expression: 'myObj."#weirdProp".foo',
    parsed: {
      type: Types.NameExpression,
      name: 'myObj."#weirdProp".foo',
    },
    described: {
      en: {
        simple: 'myObj."#weirdProp".foo',
        extended: {
          description: 'myObj."#weirdProp".foo',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'object with a numeric property',
    expression: 'myObj.12345',
    parsed: {
      type: Types.NameExpression,
      name: 'myObj.12345',
    },
    described: {
      en: {
        simple: 'myObj.12345',
        extended: {
          description: 'myObj.12345',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'variable number of parameters',
    expression: '...number',
    parsed: {
      type: Types.NameExpression,
      name: 'number',
      repeatable: true,
    },
    described: {
      en: {
        simple: 'repeatable number',
        extended: {
          description: 'number',
          modifiers: {
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'optional number parameter',
    expression: 'number=',
    parsed: {
      type: Types.NameExpression,
      name: 'number',
      optional: true,
    },
    described: {
      en: {
        simple: 'optional number',
        extended: {
          description: 'number',
          modifiers: {
            optional: en.modifiers.extended.optional,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'optional Object parameter',
    expression: 'Object=',
    parsed: {
      type: Types.NameExpression,
      name: 'Object',
      optional: true,
    },
    described: {
      en: {
        simple: 'optional Object',
        extended: {
          description: 'Object',
          modifiers: {
            optional: en.modifiers.extended.optional,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'null',
    expression: 'null',
    parsed: {
      type: Types.NullLiteral,
    },
    described: {
      en: {
        simple: 'null',
        extended: {
          description: 'null',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'repeatable null',
    expression: '...null',
    parsed: {
      type: Types.NullLiteral,
      repeatable: true,
    },
    described: {
      en: {
        simple: 'repeatable null',
        extended: {
          description: 'null',
          modifiers: {
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'undefined',
    expression: 'undefined',
    parsed: {
      type: Types.UndefinedLiteral,
    },
    described: {
      en: {
        simple: 'undefined',
        extended: {
          description: 'undefined',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'repeatable undefined',
    expression: '...undefined',
    parsed: {
      type: Types.UndefinedLiteral,
      repeatable: true,
    },
    described: {
      en: {
        simple: 'repeatable undefined',
        extended: {
          description: 'undefined',
          modifiers: {
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'all',
    expression: '*',
    parsed: {
      type: Types.AllLiteral,
    },
    described: {
      en: {
        simple: 'any type',
        extended: {
          description: 'any type',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'repeatable all',
    expression: '...*',
    parsed: {
      type: Types.AllLiteral,
      repeatable: true,
    },
    described: {
      en: {
        simple: 'repeatable any type',
        extended: {
          description: 'any type',
          modifiers: {
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'unknown',
    expression: '?',
    parsed: {
      type: Types.UnknownLiteral,
    },
    described: {
      en: {
        simple: 'unknown',
        extended: {
          description: 'unknown',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'repeatable unknown',
    expression: '...?',
    parsed: {
      type: Types.UnknownLiteral,
      repeatable: true,
    },
    described: {
      en: {
        simple: 'repeatable unknown',
        extended: {
          description: 'unknown',
          modifiers: {
            repeatable: en.modifiers.extended.repeatable,
          },
          returns: '',
        },
      },
    },
  },
  {
    description: 'name that starts with "function"',
    expression: 'functional',
    parsed: {
      type: Types.NameExpression,
      name: 'functional',
    },
    described: {
      en: {
        simple: 'functional',
        extended: {
          description: 'functional',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name that starts with a reserved word',
    expression: 'forsooth',
    parsed: {
      type: Types.NameExpression,
      name: 'forsooth',
    },
    described: {
      en: {
        simple: 'forsooth',
        extended: {
          description: 'forsooth',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name that is a reserved word',
    expression: 'this',
    parsed: {
      type: Types.NameExpression,
      name: 'this',
      reservedWord: true,
    },
    described: {
      en: {
        simple: 'this',
        extended: {
          description: 'this',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name that includes a hyphen and a numeral',
    expression: 'My-1st-Class',
    parsed: {
      type: Types.NameExpression,
      name: 'My-1st-Class',
    },
    described: {
      en: {
        simple: 'My-1st-Class',
        extended: {
          description: 'My-1st-Class',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
  {
    description: 'name that starts with an @ sign',
    expression: '@prefix',
    parsed: {
      type: Types.NameExpression,
      name: '@prefix',
    },
    described: {
      en: {
        simple: '@prefix',
        extended: {
          description: '@prefix',
          modifiers: {},
          returns: '',
        },
      },
    },
  },
];
