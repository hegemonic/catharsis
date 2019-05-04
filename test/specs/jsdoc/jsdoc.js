const en = {
    modifiers: require('../../../res/en').modifiers
};
const Types = require('../../../lib/types');

module.exports = [
    {
        description: 'name expression that starts with the word "function"',
        expression: 'functional',
        parsed: {
            type: Types.NameExpression,
            name: 'functional'
        },
        described: {
            en: {
                simple: 'functional',
                extended: {
                    description: 'functional',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression with instance scope punctuation',
        expression: 'MyClass#myMember',
        parsed: {
            type: Types.NameExpression,
            name: 'MyClass#myMember'
        },
        described: {
            en: {
                simple: 'MyClass#myMember',
                extended: {
                    description: 'MyClass#myMember',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression with inner scope punctuation',
        expression: 'MyClass~myMember',
        parsed: {
            type: Types.NameExpression,
            name: 'MyClass~myMember'
        },
        described: {
            en: {
                simple: 'MyClass~myMember',
                extended: {
                    description: 'MyClass~myMember',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression with instance and inner scope punctuation',
        expression: 'MyClass#myMember#yourMember~theirMember',
        parsed: {
            type: Types.NameExpression,
            name: 'MyClass#myMember#yourMember~theirMember'
        },
        described: {
            en: {
                simple: 'MyClass#myMember#yourMember~theirMember',
                extended: {
                    description: 'MyClass#myMember#yourMember~theirMember',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression for a class within a module',
        expression: 'module:foo/bar/baz~Qux',
        parsed: {
            type: Types.NameExpression,
            name: 'module:foo/bar/baz~Qux'
        },
        described: {
            en: {
                simple: 'module:foo/bar/baz~Qux',
                extended: {
                    description: 'module:foo/bar/baz~Qux',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression for a class within a module with hyphens',
        expression: 'module:foo-bar/baz~Qux',
        parsed: {
            type: Types.NameExpression,
            name: 'module:foo-bar/baz~Qux'
        },
        described: {
            en: {
                simple: 'module:foo-bar/baz~Qux',
                extended: {
                    description: 'module:foo-bar/baz~Qux',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression containing a reserved word',
        expression: 'this',
        parsed: {
            type: Types.NameExpression,
            name: 'this',
            reservedWord: true
        },
        described: {
            en: {
                simple: 'this',
                extended: {
                    description: 'this',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression for a symbol variation whose name is an empty string',
        expression: 'MyClass()',
        parsed: {
            type: Types.NameExpression,
            name: 'MyClass()'
        },
        described: {
            en: {
                simple: 'MyClass()',
                extended: {
                    description: 'MyClass()',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression for a symbol variation whose name is one numeral',
        expression: 'MyClass(2)',
        parsed: {
            type: Types.NameExpression,
            name: 'MyClass(2)'
        },
        described: {
            en: {
                simple: 'MyClass(2)',
                extended: {
                    description: 'MyClass(2)',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression for a symbol variation whose name is multiple numerals',
        expression: 'MyClass(23456)',
        parsed: {
            type: Types.NameExpression,
            name: 'MyClass(23456)'
        },
        described: {
            en: {
                simple: 'MyClass(23456)',
                extended: {
                    description: 'MyClass(23456)',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression for a symbol variation whose name is one letter',
        expression: 'MyClass(a)',
        parsed: {
            type: Types.NameExpression,
            name: 'MyClass(a)'
        },
        described: {
            en: {
                simple: 'MyClass(a)',
                extended: {
                    description: 'MyClass(a)',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression for a symbol variation whose name is multiple letters',
        expression: 'MyClass(abcde)',
        parsed: {
            type: Types.NameExpression,
            name: 'MyClass(abcde)'
        },
        described: {
            en: {
                simple: 'MyClass(abcde)',
                extended: {
                    description: 'MyClass(abcde)',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression enclosed in double quotes',
        expression: '"foo.bar.baz"',
        parsed: {
            type: Types.NameExpression,
            name: '"foo.bar.baz"'
        },
        described: {
            en: {
                simple: '"foo.bar.baz"',
                extended: {
                    description: '"foo.bar.baz"',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression enclosed in single quotes',
        expression: "'foo.bar.baz'",
        parsed: {
            type: Types.NameExpression,
            name: "'foo.bar.baz'"
        },
        described: {
            en: {
                simple: "'foo.bar.baz'",
                extended: {
                    description: "'foo.bar.baz'",
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression partially enclosed in double quotes',
        expression: 'foo."bar.baz".qux',
        parsed: {
            type: Types.NameExpression,
            name: 'foo."bar.baz".qux'
        },
        described: {
            en: {
                simple: 'foo."bar.baz".qux',
                extended: {
                    description: 'foo."bar.baz".qux',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'name expression partially enclosed in single quotes',
        expression: "foo.'bar.baz'.qux",
        parsed: {
            type: Types.NameExpression,
            name: "foo.'bar.baz'.qux"
        },
        described: {
            en: {
                simple: "foo.'bar.baz'.qux",
                extended: {
                    description: "foo.'bar.baz'.qux",
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'identifier with a repeatable param that is not enclosed in brackets',
        expression: 'MyClass(...foo)',
        parsed: {
            type: Types.NameExpression,
            name: 'MyClass(...foo)'
        },
        described: {
            en: {
                simple: 'MyClass(...foo)',
                extended: {
                    description: 'MyClass(...foo)',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'type application with no period',
        expression: 'Array<string>',
        newExpression: 'Array.<string>',
        parsed: {
            type: Types.TypeApplication,
            expression: {
                type: Types.NameExpression,
                name: 'Array'
            },
            applications: [
                {
                    type: Types.NameExpression,
                    name: 'string'
                }
            ]
        },
        described: {
            en: {
                simple: 'Array of string',
                extended: {
                    description: 'Array of string',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'Jsdoc Toolkit 2-style array notation for an array of strings',
        expression: 'string[]',
        newExpression: 'Array.<string>',
        parsed: {
            type: Types.TypeApplication,
            expression: {
                type: Types.NameExpression,
                name: 'Array'
            },
            applications: [
                {
                    type: Types.NameExpression,
                    name: 'string'
                }
            ]
        },
        described: {
            en: {
                simple: 'Array of string',
                extended: {
                    description: 'Array of string',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'Jsdoc Toolkit 2-style array notation for an array of functions',
        expression: 'function[]',
        newExpression: 'Array.<function()>',
        parsed: {
            type: Types.TypeApplication,
            expression: {
                type: Types.NameExpression,
                name: 'Array'
            },
            applications: [
                {
                    type: Types.FunctionType,
                    params: []
                }
            ]
        },
        described: {
            en: {
                simple: 'Array of function()',
                extended: {
                    description: 'Array of function()',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'Jsdoc Toolkit 2-style nested array (two levels)',
        expression: 'number[][]',
        newExpression: 'Array.<Array.<number>>',
        parsed: {
            type: Types.TypeApplication,
            expression: {
                type: Types.NameExpression,
                name: 'Array'
            },
            applications: [
                {
                    type: Types.TypeApplication,
                    expression: {
                        type: Types.NameExpression,
                        name: 'Array'
                    },
                    applications: [
                        {
                            type: Types.NameExpression,
                            name: 'number'
                        }
                    ]
                }
            ]
        },
        described: {
            en: {
                simple: 'Array of Array of number',
                extended: {
                    description: 'Array of Array of number',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'Jsdoc Toolkit 2-style nested array (three levels)',
        expression: 'number[][][]',
        newExpression: 'Array.<Array.<Array.<number>>>',
        parsed: {
            type: Types.TypeApplication,
            expression: {
                type: Types.NameExpression,
                name: 'Array'
            },
            applications: [
                {
                    type: Types.TypeApplication,
                    expression: {
                        type: Types.NameExpression,
                        name: 'Array'
                    },
                    applications: [
                        {
                            type: Types.TypeApplication,
                            expression: {
                                type: Types.NameExpression,
                                name: 'Array'
                            },
                            applications: [
                                {
                                    type: Types.NameExpression,
                                    name: 'number'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        described: {
            en: {
                simple: 'Array of Array of Array of number',
                extended: {
                    description: 'Array of Array of Array of number',
                    modifiers: {},
                    returns: ''
                }
            }
        }

    },
    {
        description: 'record type with a property that uses a type application as a key',
        expression: '{Array.<string>: number}',
        parsed: {
            type: Types.RecordType,
            fields: [
                {
                    type: Types.FieldType,
                    key: {
                        type: Types.TypeApplication,
                        expression: {
                            type: Types.NameExpression,
                            name: 'Array'
                        },
                        applications: [
                            {
                                type: Types.NameExpression,
                                name: 'string'
                            }
                        ]
                    },
                    value: {
                        type: Types.NameExpression,
                        name: 'number'
                    }
                }
            ]
        },
        described: {
            en: {
                simple: '{Array of string: number}',
                extended: {
                    description: '{Array of string: number}',
                    modifiers: {},
                    returns: ''
                }
            }
        }
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
                                name: 'number'
                            },
                            {
                                type: Types.NameExpression,
                                name: 'boolean'
                            },
                            {
                                type: Types.NameExpression,
                                name: 'string'
                            }
                        ]
                    },
                    value: {
                        type: Types.NameExpression,
                        name: 'number'
                    }
                }
            ]
        },
        described: {
            en: {
                simple: '{(number, boolean, or string): number}',
                extended: {
                    description: '{(number, boolean, or string): number}',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'record type with a property name that starts with a literal',
        expression: '{undefinedHTML: (string|undefined)}',
        parsed: {
            type: Types.RecordType,
            fields: [
                {
                    type: Types.FieldType,
                    key: {
                        type: Types.NameExpression,
                        name: 'undefinedHTML'
                    },
                    value: {
                        type: Types.TypeUnion,
                        elements: [
                            {
                                type: Types.NameExpression,
                                name: 'string'
                            },
                            {
                                type: Types.UndefinedLiteral
                            }
                        ]
                    }
                }
            ]
        },
        described: {
            en: {
                simple: '{undefinedHTML: (string or undefined)}',
                extended: {
                    description: '{undefinedHTML: (string or undefined)}',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'record type with a property that contains a function with no preceding space',
        expression: '{foo:function()}',
        newExpression: '{foo: function()}',
        parsed: {
            type: 'RecordType',
            fields: [
                {
                    type: 'FieldType',
                    key: {
                        type: 'NameExpression',
                        name: 'foo'
                    },
                    value: {
                        type: 'FunctionType',
                        params: []
                    }
                }
            ]
        },
        described: {
            en: {
                simple: '{foo: function()}',
                extended: {
                    description: '{foo: function()}',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'function type with no trailing pathentheses',
        expression: 'function',
        newExpression: 'function()',
        parsed: {
            type: Types.FunctionType,
            params: []
        },
        described: {
            en: {
                simple: 'function()',
                extended: {
                    description: 'function()',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    },
    {
        description: 'standard function type (should still parse if JSDoc expressions are allowed)',
        expression: 'function(this:my.namespace.Class, my.Class)=',
        parsed: {
            type: Types.FunctionType,
            params: [
                {
                    type: Types.NameExpression,
                    name: 'my.Class'
                }
            ],
            'this': {
                type: Types.NameExpression,
                name: 'my.namespace.Class'
            },
            optional: true
        },
        described: {
            en: {
                simple: 'optional function(this = my.namespace.Class, my.Class)',
                extended: {
                    description: 'function(my.Class)',
                    modifiers: {
                        functionThis: 'Within the function, this refers to my.namespace.Class.',
                        optional: en.modifiers.extended.optional
                    },
                    returns: ''
                }
            }
        }
    },
    {
        description: 'type union with no parentheses, a repeatable param, and a JSDoc-style array',
        expression: '...string|string[]',
        newExpression: '(...string|Array.<string>)',
        parsed: {
            type: 'TypeUnion',
            elements: [
                {
                    type: 'NameExpression',
                    name: 'string',
                    repeatable: true
                },
                {
                    type: 'TypeApplication',
                    expression: {
                        type: 'NameExpression',
                        name: 'Array'
                    },
                    applications: [
                        {
                            name: 'string',
                            type: 'NameExpression'
                        }
                    ]
                }
            ]
        },
        described: {
            en: {
                simple: '(repeatable string or Array of string)',
                extended: {
                    description: '(repeatable string or Array of string)',
                    modifiers: {},
                    returns: ''
                }
            }
        }
    }
];
