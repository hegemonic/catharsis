const _ = require('lodash');

const en = {
    modifiers: require('../../res/en').modifiers
};
const Types = require('../../lib/types');

const optional = {
    optional: true
};
const repeatable = {
    repeatable: true
};

const nullableNumber = {
    type: Types.NameExpression,
    name: 'number',
    nullable: true
};
const nullableNumberOptional = _.extend({}, nullableNumber, optional);
const nullableNumberOptionalRepeatable = _.extend({}, nullableNumber, optional, repeatable);
const nullableNumberRepeatable = _.extend({}, nullableNumber, repeatable);

const nonNullableObject = {
    type: Types.NameExpression,
    name: 'Object',
    nullable: false
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
                        nullable: en.modifiers.extended.nullable
                    },
                    returns: ''
                }
            }
        }
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
                        nullable: en.modifiers.extended.nullable
                    },
                    returns: ''
                }
            }
        }
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
                        nullable: en.modifiers.extended.nonNullable
                    },
                    returns: ''
                }
            }
        }
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
                        nullable: en.modifiers.extended.nonNullable
                    },
                    returns: ''
                }
            }
        }
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
                        repeatable: en.modifiers.extended.repeatable
                    },
                    returns: ''
                }
            }
        }
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
                        repeatable: en.modifiers.extended.repeatable
                    },
                    returns: ''
                }
            }
        }
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
                        repeatable: en.modifiers.extended.repeatable
                    },
                    returns: ''
                }
            }
        }
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
                        repeatable: en.modifiers.extended.repeatable
                    },
                    returns: ''
                }
            }
        }
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
                        optional: en.modifiers.extended.optional
                    },
                    returns: ''
                }
            }
        }
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
                        optional: en.modifiers.extended.optional
                    },
                    returns: ''
                }
            }
        }
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
                        repeatable: en.modifiers.extended.repeatable
                    },
                    returns: ''
                }
            }
        }
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
                        optional: en.modifiers.extended.optional
                    },
                    returns: ''
                }
            }
        }
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
                        optional: en.modifiers.extended.optional
                    },
                    returns: ''
                }
            }
        }
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
                        repeatable: en.modifiers.extended.repeatable
                    },
                    returns: ''
                }
            }
        }
    }
];
